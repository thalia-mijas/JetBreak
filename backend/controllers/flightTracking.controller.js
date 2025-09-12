const Airport = require("../models/airport.model");
const User = require("../models/user.model");
const Airline = require("../models/airline.model");
const Flight = require("../models/flight.model");
const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_STACK_API_KEY;
const CACHE_TIME = process.env.CACHE_TIME;

exports.createFlightTracking = async (req, res) => {
  try {
    const { user_id, airline_iata, number, date } = req.body;

    if (!user_id || !airline_iata || !number || !date) {
      return res
        .status(400)
        .json({ message: "User, airline_iata, number and date are required" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${airline_iata}${number}`;
    const options = {
      method: "GET",
    };

    let flight = [];

    const cachedKey = `flightTracking:${airline_iata}${number}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache flightTracking from Redis");
      flight = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");
      const response = await fetch(url, options);
      flight = await response.json().data;

      await redisClient.set(cachedKey, JSON.stringify(flight), {
        EX: CACHE_TIME,
      });
    }

    if (flight.length === 0) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const match = flight.find((f) => f.flight_date === date);

    let airline = await Airline.findOne({
      where: { iata_code: match.airline.iata },
    });

    if (!airline) {
      console.log("Aerolínea no encontrada en la base de datos");
      try {
        airline = await Airline.create({
          iata_code: match.airline.iata,
          name: match.airline.name,
        });
        console.log(`✅ Creando aerolínea: ${match.airline.name}`);
        airline = await Airline.findOne({
          where: { iata_code: match.airline.iata },
        });
      } catch (error) {
        console.error(`❌ Error creando ${match.airline.name}:`, error.message);
      }
    }

    if (match) {
      const flightTracking = await Flight.create({
        user_id,
        airline_id: airline?.id || null,
        origin_iata:
          (
            await Airport.findOne({
              where: { iata_code: match.departure.iata },
            })
          ).id || null,
        destination_iata:
          (
            await Airport.findOne({
              where: { iata_code: match.arrival.iata },
            })
          ).id || null,
        number,
        date,
        state: match.flight_status || "unknown",
      });

      res.status(201).json({
        message: "FlightTracking created successfully",
        flight: flightTracking,
      });
    } else {
      return res.status(404).json({ message: "No matches found" });
    }
  } catch (error) {
    console.error("Error fetching flightTracking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserFlightTrackings = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await User.findByPk(user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const flightTrackings = await Flight.findAll({
      where: { user_id },
      include: [
        { model: Airline, as: "airline" },
        { model: Airport, as: "origin" },
        { model: Airport, as: "destination" },
      ],
    });

    if (flightTrackings.length === 0) {
      return res.status(404).json({ message: "No flight trackings found" });
    }

    res.status(200).json(flightTrackings);
  } catch (error) {
    console.error("Error fetching user flight trackings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
