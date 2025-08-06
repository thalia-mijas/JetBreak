const fs = require("fs");
const path = require("path");

exports.getAirlines = async (req, res) => {
  try {
    const airlinesFilePath = path.join(__dirname, "../mocks/airlines.json");
    const airlinesData = fs.readFileSync(airlinesFilePath, "utf8");
    const airlines = JSON.parse(airlinesData);
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
    const airlinesFilePath = path.join(__dirname, "../mocks/airlines.json");
    const airlinesData = fs.readFileSync(airlinesFilePath, "utf8");
    const airlines = JSON.parse(airlinesData);
    const airline = airlines.find((a) => a.iata_code === airlineCode);

    if (!airline) {
      return res.status(404).json({ message: "Airline not found" });
    }

    res.status(200).json(airline);
  } catch (error) {
    console.error("Error fetching airline:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
