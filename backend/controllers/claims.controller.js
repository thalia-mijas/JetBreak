const Claim = require("../models/claim.model");
const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_STACK_API_KEY;
const CACHE_TIME = process.env.CACHE_TIME;

// Create a new claim
exports.createClaim = async (req, res) => {
  try {
    const { user_id, type, flight_iata, date, description } = req.body;

    if (!user_id || !type || !flight_iata || !date || !description) {
      return res.status(400).json({
        message: "Type, flight, date, description and user_id are required",
      });
    }

    try {
      const url = `https://api.aviationstack.com/v1/timetable?access_key=${API_KEY}&flight_iata=${flight_iata}`;
      const options = {
        method: "GET",
      };

      const cachedKey = `flight:${flight_iata}`;
      const cachedData = await redisClient.get(cachedKey);
      if (cachedData) {
        console.log("Cache flight from Redis");
        return res.json(JSON.parse(cachedData));
      }
      console.log("Cache miss, fetching from API");
      const response = await fetch(url, options);
      const flight = await response.json();

      console.log("Flight founded:", flight);

      if (!flight.data || flight.data.length === 0) {
        return res.status(404).json({ message: "Flight not found" });
      }

      await redisClient.set(cachedKey, JSON.stringify(flight.data), {
        EX: CACHE_TIME,
      });

      console.log("Flight founded:", flight);
    } catch (error) {
      console.error("Error founding flight:", error);
      return res.status(404).json({ message: "Flight not found" });
    }

    const claim = await Claim.create({
      user_id,
      type,
      flight_iata,
      date,
      description,
    });

    res
      .status(201)
      .json({ message: "Claim created successfully", claim: claim });
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
