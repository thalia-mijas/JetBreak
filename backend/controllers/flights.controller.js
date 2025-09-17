const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_STACK_API_KEY;
const CACHE_TIME = process.env.CACHE_TIME;

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

    let flights = [];

    console.log(typeof CACHE_TIME);

    const cachedKey = `arrivals${iataCode}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache arrivals from Redis");
      flights = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");
      const response = await fetch(url, options);
      flights = await response.json();
      flights = flights.data.filter(
        (flight) => flight.flight && flight.flight.iataCode !== ""
      );
      await redisClient.set(cachedKey, JSON.stringify(flights), {
        EX: CACHE_TIME,
      });
    }
    res.status(200).json(flights);
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

    let flights = [];

    const cachedKey = `departures${iataCode}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache departures from Redis");
      flights = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");
      const response = await fetch(url, options);
      flights = await response.json();
      flights = flights.data.filter(
        (flight) => flight.flight && flight.flight.iataCode !== ""
      );
      await redisClient.set(cachedKey, JSON.stringify(flights), {
        EX: CACHE_TIME,
      });
    }
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error fetching departures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
