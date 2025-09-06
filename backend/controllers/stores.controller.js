const redisClient = require("../redis");
const CACHE_TIME = process.env.CACHE_TIME;
const API_KEY = process.env.FOURSQUARE_API_KEY;

exports.getStores = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const url = `https://places-api.foursquare.com/places/search?ll=${latitude},${longitude}&tel_format=NATIONAL&limit=50`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
      },
    };

    const response = await fetch(url, options);
    const stores = await response.json();
    const cachedKey = `stores/${latitude}/${longitude}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache stores from Redis");
      return res.json(JSON.parse(cachedData));
    }
    console.log("Cache miss, fetching from API");

    const filteredStores = stores.results
      .filter((store) => {
        const parentName =
          store?.related_places?.parent?.name?.toLowerCase() || "";
        const address = store?.location?.address?.toLowerCase() || "";

        return (
          parentName.includes("aeropuerto") ||
          parentName.includes("airport") ||
          address.includes("aeropuerto") ||
          address.includes("airport")
        );
      })
      .map((store) => ({
        id: store.fsq_place_id,
        name: store.name,
        icon: `${store.categories[0].icon.prefix}bg_64${store.categories[0].icon.suffix}`,
        category: store.categories[0].name,
      }));

    await redisClient.set(cachedKey, JSON.stringify(filteredStores), {
      EX: CACHE_TIME,
    });

    res.status(200).json(filteredStores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
