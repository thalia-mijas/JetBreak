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
      const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flight_iata}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(url, options);
      const flight = await response.json();

      if (flight.data.length === 0) {
        return res.status(404).json({ message: "Flight not found" });
      }

      const match = flight.data.find((f) => f.flight_date === date);

      if (match) {
        console.log("Vuelo encontrado:", match);
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
      } else {
        return res.status(404).json({ message: "No existen coincidencias" });
      }
    } catch (error) {
      console.error("Error finding flight:", error);
      return res.status(404).json({ message: "Error finding flight" });
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
