const fs = require("fs");
const path = require("path");
const CACHE_TIME = process.env.CACHE_TIME;

exports.getStores = async (req, res) => {
  try {
    const cachedKey = `stores`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache stores from Redis");
      return res.json(JSON.parse(cachedData));
    }
    console.log("Cache miss, fetching from API");

    const storesFilePath = path.join(__dirname, "../mocks/stores.json");
    const storesData = fs.readFileSync(storesFilePath, "utf8");
    const stores = JSON.parse(storesData).results;
    const filteredStores = stores
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
