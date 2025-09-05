const fs = require("fs");
const path = require("path");
const Airline = require("../models/airline.model");

async function seedAirlines() {
  const filePath = path.join(__dirname, "../mocks/airlines.json");
  const rawData = fs.readFileSync(filePath);
  const fullAirlines = JSON.parse(rawData);

  // Extraer solo iata_code y airline_name
  const minimalAirlines = fullAirlines.map((a) => ({
    iata_code: a.iata_code,
    name: a.airline_name,
  }));

  for (const data of minimalAirlines) {
    try {
      await Airline.findOrCreate({
        where: { iata_code: data.iata_code },
        defaults: { name: data.name },
      });
    } catch (error) {
      console.error(`❌ Error con ${data.name}:`, error.message);
    }
  }
  console.log(`✅ Aerolíneas creadas`);
}

// seedAirlines(); // Moved to app.js after sync

exports.seedAirlines = seedAirlines;

exports.getAirlines = async (req, res) => {
  try {
    const airlines = await Airline.findAll();
    res.status(200).json(airlines);
  } catch (error) {
    console.error("Error fetching airlines:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAirline = async (req, res) => {
  const { airlineCode } = req.params;

  console.log("Fetching airline with code:", airlineCode);

  try {
    const airline = await Airline.findOne({
      where: { iata_code: airlineCode },
    });

    if (!airline) {
      return res.status(404).json({ message: "Airline not found" });
    }

    res.status(200).json(airline);
  } catch (error) {
    console.error("Error fetching airline:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
