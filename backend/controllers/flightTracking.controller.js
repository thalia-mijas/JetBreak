const Airport = require("../models/airport.model");
const User = require("../models/user.model");
const Airline = require("../models/airline.model");
const Flight = require("../models/flight.model");
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

    let flight = [];

    const cachedKey = `flight:${flight_iata}:${date}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache flight from Redis");
      flight = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");

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

    if (flight.length === 0) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const airline = await Airline.findOne({
      where: { iata_code: flight[0].flightDesignator.carrierCode },
    });

    if (flight && flight.length > 0) {
      const flightTracking = await Flight.create({
        user_id,
        flight_iata,
        airline_id: airline?.id || null,
        origin_iata:
          (
            await Airport.findOne({
              where: { iata_code: flight[0].flightPoints[0].iataCode },
            })
          ).id || null,
        destination_iata:
          (
            await Airport.findOne({
              where: { iata_code: flight[0].flightPoints[1].iataCode },
            })
          ).id || null,
        date,
        state: null,
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

exports.deleteFlightTracking = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "FlightTracking ID is required" });
  }

  try {
    const flightTracking = await Flight.findByPk(id);
    if (!flightTracking) {
      return res.status(404).json({ message: "FlightTracking not found" });
    }

    await flightTracking.destroy();
    res.status(200).json({ message: "FlightTracking deleted successfully" });
  } catch (error) {
    console.error("Error deleting flight tracking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
