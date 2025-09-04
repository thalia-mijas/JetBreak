const Airline = require("../models/airline.model");
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

      const cachedKey = `flight:${flight_iata}`;
      const cachedData = await redisClient.get(cachedKey);
      if (cachedData) {
        console.log("Cache flight from Redis");
        return res.json(JSON.parse(cachedData));
      }
      console.log("Cache miss, fetching from API");

      const response = await fetch(url, options);
      const flight = await response.json();

      await redisClient.set(cachedKey, JSON.stringify(flight.data), {
        EX: CACHE_TIME,
      });

      if (flight.data.length === 0) {
        return res.status(404).json({ message: "Flight not found" });
      }

      const match = flight.data.find((f) => f.flight_date === date);

      console.log("Flight data from API:", match);

      console.log("Buscando aerolínea con IATA:", match.airline.iata);

      const airline = await Airline.findOne({
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
        } catch (error) {
          console.error(
            `❌ Error creando ${match.airline.name}:`,
            error.message
          );
        }
      }

      if (match) {
        console.log("Flight founded:", match);
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

exports.getClaimsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
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
