const redisClient = require("../redis");
const CACHE_TIME = process.env.CACHE_TIME;
const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

exports.getOffers = async (req, res) => {
  try {
    const { origin } = req.params;

    if (!origin) {
      return res.status(400).json({
        message: "Origin is required",
      });
    }

    let filteredOffers = [];

    const cachedKey = `offers:${origin}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache offers from Redis");
      filteredOffers = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");
      const amadeusResponse = await amadeus.shopping.flightDestinations.get({
        origin,
      });

      const offers = amadeusResponse.data;

      var id = 1;

      const newOffers = offers.map((offer) => ({
        id: id++,
        origin: offer.origin,
        destination: offer.destination,
        departure: offer.departureDate,
        return: offer.returnDate,
        conf: offer.links.flightOffers
          .replace("&viewBy=DESTINATION", "")
          .replace(
            "https://test.api.amadeus.com/v2/shopping/flight-offers?",
            ""
          ),
      }));

      filteredOffers = newOffers.filter((offer) => offer.origin === origin);
      filteredOffers.sort((a, b) => (a.departure >= b.departure ? 1 : -1));

      await redisClient.set(cachedKey, JSON.stringify(filteredOffers), {
        EX: CACHE_TIME,
      });
    }

    res.status(200).json(filteredOffers);
  } catch (error) {
    if (
      error.code === "NotFoundError" &&
      error.description?.[0]?.code === 1797
    ) {
      return res.status(404).json({ message: "No offers found" });
    }
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOfferDetails = async (req, res) => {
  try {
    const { conf } = req.params;

    if (!conf) {
      return res.status(400).json({ message: "Conf is required" });
    }

    params = new URLSearchParams(conf);

    let filteredOfferDetails = [];

    const cachedKey = `offerDetails:${params.get(
      "originLocationCode"
    )}:${params.get("destinationLocationCode")}:${params.get(
      "departureDate"
    )}:${params.get("returnDate")}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache offers from Redis");
      filteredOfferDetails = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");

      // Use Amadeus SDK to fetch offer details
      const offerDetailsResponse =
        await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: params.get("originLocationCode"),
          destinationLocationCode: params.get("destinationLocationCode"),
          departureDate: params.get("departureDate"),
          returnDate: params.get("returnDate"),
          adults: Number(params.get("adults")),
          max: 20,
        });

      const newDetails = offerDetailsResponse.data.map((offer) => ({
        id: offer.id,
        itineraries: offer.itineraries,
        total: offer.travelerPricings[0].price.total,
      }));

      filteredOfferDetails = newDetails;

      await redisClient.set(cachedKey, JSON.stringify(filteredOfferDetails), {
        EX: CACHE_TIME,
      });
    }

    res.status(200).json(filteredOfferDetails);
  } catch (error) {
    console.error("Error fetching offerDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
