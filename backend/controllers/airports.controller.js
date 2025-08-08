const jwt = require("jsonwebtoken");
const Claim = require("../models/claim.model");
const createIPMiddleware = require("../middlewares/createIP.middleware");
const fs = require("fs");
const path = require("path");

exports.getAirports = async (req, res) => {
  try {
    const airportsFilePath = path.join(__dirname, "../mocks/airports.json");
    const airportsData = fs.readFileSync(airportsFilePath, "utf8");
    const airports = JSON.parse(airportsData).map((airport) => ({
      airport_id: airport.airport_id,
      iata_code: airport.iata_code,
      latitude: airport.latitude,
      longitude: airport.longitude,
      airport_name: airport.airport_name.replace(/\n/g, "").replace(/\r/g, ""),
      country_name: airport.country_name,
    }));
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
    const airportsFilePath = path.join(__dirname, "../mocks/airports.json");
    const airportsData = fs.readFileSync(airportsFilePath, "utf8");
    const airports = JSON.parse(airportsData);
    const airport = airports.find((a) => a.iata_code === airportCode);

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
    const airportsFilePath = path.join(__dirname, "../mocks/airports.json");
    const airportsData = fs.readFileSync(airportsFilePath, "utf8");
    const airports = JSON.parse(airportsData);

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
    console.error("Error fetching nearby airports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
