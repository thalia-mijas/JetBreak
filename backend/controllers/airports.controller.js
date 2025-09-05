const fs = require("fs");
const path = require("path");
const Airport = require("../models/airport.model");

async function seedAirports() {
  const filePath = path.join(__dirname, "../mocks/airports.json");
  const rawData = fs.readFileSync(filePath);
  const fullAirports = JSON.parse(rawData);

  const minimalAirports = fullAirports.map((a) => ({
    iata_code: a.iata_code,
    latitude: a.latitude,
    longitude: a.longitude,
    name: a.airport_name,
  }));

  for (const data of minimalAirports) {
    try {
      await Airport.findOrCreate({
        where: { iata_code: data.iata_code },
        defaults: {
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });
    } catch (error) {
      console.error(`❌ Error con ${data.name}:`, error.message);
    }
  }
  console.log(`✅ Aeropuertos creados`);
}

exports.seedAirports = seedAirports;

exports.getAirports = async (req, res) => {
  try {
    const airports = await Airport.findAll();
    res.status(200).json(airports);
  } catch (error) {
    console.error("Error fetching airports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAirport = async (req, res) => {
  const { airportCode } = req.params;

  console.log("Fetching airport with code:", airportCode);

  try {
    const airport = await Airport.findOne({
      where: { iata_code: airportCode },
    });

    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    res.status(200).json(airport);
  } catch (error) {
    console.error("Error fetching airport:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAirportsByUbication = async (req, res) => {
  const { latitude, longitude } = req.params;

  let radius = 0; // Define a radius for nearby airports
  let nearbyAirports = [];

  console.log("Fetching airports near:", latitude, longitude);

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  }

  try {
    airports = await Airport.findAll();

    do {
      console.log(`Searching for airports within ${radius} degrees`);
      nearbyAirports = airports.filter((airport) => {
        return (
          airport.latitude > parseFloat(latitude) - radius &&
          airport.latitude < parseFloat(latitude) + radius &&
          airport.longitude > parseFloat(longitude) - radius &&
          airport.longitude < parseFloat(longitude) + radius
        );
      });
      radius = radius + 0.1; // Increase radius if no airports found
    } while (nearbyAirports.length === 0);

    res.status(200).json(nearbyAirports);
  } catch (error) {
    console.error("Error fetching airports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
