const fs = require("fs");
const path = require("path");
const CACHE_TIME = process.env.CACHE_TIME;

exports.getOffers = async (req, res) => {
  try {
    const cachedKey = `offers`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache offers from Redis");
      return res.json(JSON.parse(cachedData));
    }
    console.log("Cache miss, fetching from API");

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

    await redisClient.set(cachedKey, JSON.stringify(filteredOffers), {
      EX: CACHE_TIME,
    });

    res.status(200).json(filteredOffers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
