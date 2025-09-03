const fs = require("fs");
const path = require("path");
const API_KEY = process.env.AVIATIONSTACK_API_KEY;

exports.getAirlines = async (req, res) => {
  const url = `http://api.aviationstack.com/v1/airlines?access_key=${API_KEY}`;
  const options = {
    method: "GET",
  };

  async function guardarAerolíneasActivas() {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log("Datos de aerolíneas:", data);
      console.log("Datos de aerolíneas22:", data.data);

      const aerolineasActivas = data.data.filter(
        (a) => a.type === "scheduled" && a.status === "active"
      );

      fs.writeFileSync(
        "../mocks/airlines.json",
        JSON.stringify(aerolineasActivas, null, 2),
        "utf-8"
      );
      console.log(
        `✅ Se guardaron ${aerolineasActivas.length} aerolíneas activas en airlines.json`
      );
    } catch (error) {
      console.error("❌ Error al guardar aerolíneas:", error);
    }
  }

  guardarAerolíneasActivas();
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
