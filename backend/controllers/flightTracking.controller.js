const Airport = require("../models/airport.model");
const User = require("../models/user.model");
const Airline = require("../models/airline.model");
const Flight = require("../models/flight.model");
const UserFlight = require("../models/userFlight.model");
const FlightAirport = require("../models/flightAirport.model");
const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_STACK_API_KEY;
const CACHE_TIME = process.env.CACHE_TIME;
const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

exports.createFlightTracking = async (req, res) => {
  try {
    const { user_id, flight_iata, date } = req.body;

    if (!user_id || !flight_iata || !date) {
      return res
        .status(400)
        .json({ message: "User, flight_iata and date are required" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (date <= new Date().toISOString().split("T")[0]) {
      return res.status(400).json({ message: "Date cannot be in the past" });
    }

    const cachedKey = `flight:${flight_iata}:${date}`;
    let flightData = await redisClient.get(cachedKey);

    let flight = flightData ? JSON.parse(flightData) : null;

    if (!flight) {
      const amadeusResponse = await amadeus.schedule.flights.get({
        carrierCode: flight_iata.slice(0, 2),
        flightNumber: flight_iata.slice(2),
        scheduledDepartureDate: date,
      });

      flight = amadeusResponse.data;
      await redisClient.set(cachedKey, JSON.stringify(flight), {
        EX: CACHE_TIME,
      });
    }

    if (!flight || flight.length === 0) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const airline = await Airline.findOne({
      where: { iata_code: flight[0].flightDesignator.carrierCode },
    });

    const originAirport = await Airport.findOne({
      where: { iata_code: flight[0].flightPoints[0].iataCode },
    });

    const destinationAirport = await Airport.findOne({
      where: { iata_code: flight[0].flightPoints[1].iataCode },
    });

    // Verifica si el vuelo ya existe
    let flightRecord = await Flight.findOne({
      where: {
        flight_iata,
        date_departure: flight[0].flightPoints[0].departure.timings[0].value,
      },
    });

    if (!flightRecord) {
      flightRecord = await Flight.create({
        flight_iata,
        airline_id: airline?.id || null,
        date_departure:
          flight[0].flightPoints[0].departure.timings[0].value || null,
        date_arrival:
          flight[0].flightPoints[1].arrival.timings[0].value || null,
        state: "scheduled",
      });

      // Relación con aeropuertos
      await FlightAirport.bulkCreate([
        {
          flight_id: flightRecord.id,
          airport_id: originAirport?.id || null,
          type: "origen",
        },
        {
          flight_id: flightRecord.id,
          airport_id: destinationAirport?.id || null,
          type: "destino",
        },
      ]);
    }

    // Verifica si el usuario ya está vinculado al vuelo
    const existingTracking = await UserFlight.findOne({
      where: {
        user_id,
        flight_id: flightRecord.id,
      },
    });

    if (existingTracking) {
      return res
        .status(409)
        .json({ message: "Flight tracking already exists for this user" });
    }

    // Crea la relación en la tabla intermedia
    await UserFlight.create({
      user_id,
      flight_id: flightRecord.id,
    });

    res.status(201).json({
      message: "FlightTracking created successfully",
      flight: flightRecord,
    });
  } catch (error) {
    console.error("Error creating flight tracking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserFlightTrackings = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findByPk(user_id, {
      include: {
        model: Flight,
        through: { attributes: [] }, // oculta campos de UserFlight
        include: [
          { model: Airline, as: "airline" },
          {
            model: Airport,
            through: {
              model: FlightAirport,
              attributes: ["type"],
            },
          },
        ],
      },
    });

    if (!user || user.Flights.length === 0) {
      return res.status(404).json({ message: "No flight trackings found" });
    }

    // Actualizar estado de los vuelos
    await Promise.all(
      user.Flights.map(async (flight) => {
        const flightDate = flight.date_departure?.toISOString().split("T")[0];

        if (flightDate >= new Date().toISOString().split("T")[0]) {
          try {
            const statusURL = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flight.flight_iata}`;
            const response = await fetch(statusURL);
            const data = await response.json();

            const match = data?.data?.find((f) => f.flight_date === flightDate);

            if (match?.flight_status) {
              flight.state = match.flight_status;
              await flight.save();
            }
          } catch (error) {
            console.error("Error fetching flight status:", error);
          }
        } else {
          if (!flight.state) {
            flight.state = "landed";
            await flight.save();
          }
        }
      })
    );

    res.status(200).json(user.Flights);
  } catch (error) {
    console.error("Error fetching user flight trackings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteFlightTracking = async (req, res) => {
  const { user_id, flight_id } = req.params;

  if (!user_id || !flight_id) {
    return res
      .status(400)
      .json({ message: "User ID and Flight ID are required" });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const flight = await Flight.findByPk(flight_id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const tracking = await UserFlight.findOne({
      where: { user_id, flight_id },
    });

    if (!tracking) {
      return res
        .status(404)
        .json({ message: "Tracking not found for this user and flight" });
    }

    await tracking.destroy();

    // Verifica si el vuelo está vinculado a otros usuarios
    const remainingLinks = await UserFlight.count({
      where: { flight_id },
    });

    if (remainingLinks === 0) {
      await Flight.destroy({ where: { id: flight_id } });
    }

    res.status(200).json({ message: "Flight tracking deleted successfully" });
  } catch (error) {
    console.error("Error deleting flight tracking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
