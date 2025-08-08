const fs = require("fs");
const path = require("path");

exports.getOffers = async (req, res) => {
  try {
    const offersFilePath = path.join(__dirname, "../mocks/offers.json");
    const offersData = fs.readFileSync(offersFilePath, "utf8");
    const offers = JSON.parse(offersData).data;
    const filteredOffers = offers.map((offer) => ({
      id: offer.id,
      owner: offer.owner.name,
      icon: offer.owner.logo_symbol_url,
      class:
        offer.slices[0].segments[0].passengers[0].cabin_class_marketing_name,
      flight: `${offer.slices[0].segments[0].marketing_carrier.iata_code} ${offer.slices[0].segments[0].marketing_carrier_flight_number}`,
      origin: offer.slices[0].segments[0].origin.name,
      departure: offer.slices[0].segments[0].departing_at,
      destination: offer.slices[0].segments[0].destination.name,
      arrival: offer.slices[0].segments[0].arriving_at,
      duration: offer.slices[0].segments[0].duration,
      total: `£${offer.total_amount} ${offer.total_currency} for ${offer.passengers[0].type}`,
    }));
    res.status(200).json(filteredOffers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getAirline = async (req, res) => {
//   const { airlineCode } = req.params;

//   console.log("Fetching airline with code:", airlineCode);

//   try {
//     const airlinesFilePath = path.join(__dirname, "../mocks/airlines.json");
//     const airlinesData = fs.readFileSync(airlinesFilePath, "utf8");
//     const airlines = JSON.parse(airlinesData);
//     const airline = airlines.find((a) => a.iata_code === airlineCode);

//     if (!airline) {
//       return res.status(404).json({ message: "Airline not found" });
//     }

//     res.status(200).json(airline);
//   } catch (error) {
//     console.error("Error fetching airline:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
