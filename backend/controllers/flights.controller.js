const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_STACK_API_KEY;

exports.getArrivals = async (req, res) => {
  try {
    const { iataCode } = req.params;

    if (!iataCode) {
      return res.status(400).json({ message: "IATA code is required" });
    }

    const url = `https://api.aviationstack.com/v1/timetable?access_key=${API_KEY}&iataCode=${iataCode}&type=arrival`;
    const options = {
      method: "GET",
    };

    const cachedKey = `arrivals:${iataCode}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache hit from Redis");
      return res.json(JSON.parse(cachedData));
    }
    console.log("Cache miss, fetching from API");
    const response = await fetch(url, options);
    const flights = await response.json();
    await redisClient.set(cachedKey, JSON.stringify(flights.data), {
      EX: 86400, // Cache for 1 day
    });
    res.status(200).json(flights.data);
  } catch (error) {
    console.error("Error fetching arrivals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDepartures = async (req, res) => {
  try {
    const { iataCode } = req.params;

    if (!iataCode) {
      return res.status(400).json({ message: "IATA code is required" });
    }

    const url = `https://api.aviationstack.com/v1/timetable?access_key=${API_KEY}&iataCode=${iataCode}&type=departure`;
    const options = {
      method: "GET",
    };

    const cachedKey = `departures:${iataCode}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache hit from Redis");
      return res.json(JSON.parse(cachedData));
    }
    console.log("Cache miss, fetching from API");
    const response = await fetch(url, options);
    const flights = await response.json();
    await redisClient.set(cachedKey, JSON.stringify(flights.data), {
      EX: 86400, // Cache for 1 day
    });
    res.status(200).json(flights.data);
  } catch (error) {
    console.error("Error fetching departures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
