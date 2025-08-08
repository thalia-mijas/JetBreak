const fs = require("fs");
const path = require("path");

exports.getStores = async (req, res) => {
  try {
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
    res.status(200).json(filteredStores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
