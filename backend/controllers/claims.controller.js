const Airline = require("../models/airline.model");
const Claim = require("../models/claim.model");
const User = require("../models/user.model");
const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_STACK_API_KEY;
const CACHE_TIME = process.env.CACHE_TIME;
const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// Create a new claim
exports.createClaim = async (req, res) => {
  try {
    const { user_id, type, flight_iata, date, description } = req.body;

    if (!user_id || !type || !flight_iata || !date || !description) {
      return res.status(400).json({
        message: "Type, flight, date, description and user_id are required",
      });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let flight = [];

    const cachedKey = `flight:${flight_iata}`;
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
      const claim = await Claim.create({
        user_id,
        airline_id: airline?.id || null,
        type,
        flight_iata,
        date,
        description,
      });

      res
        .status(201)
        .json({ message: "Claim created successfully", claim: claim });
    } else {
      return res.status(404).json({ message: "No matches found" });
    }
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll();
    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getClaimsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const claims = await Claim.findAll({ where: { user_id: userId } });
    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.delClaim = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Claim ID is required" });
    }
    const claim = await Claim.findByPk(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    await Claim.destroy({ where: { id } });
    res.status(200).json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.error("Error deleting claim:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
