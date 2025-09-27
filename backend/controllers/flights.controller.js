const redisClient = require("../redis");
const API_KEY = process.env.AVIATION_EDGE_API_KEY;
const CACHE_TIME = process.env.CACHE_TIME;
const mockArrivals = require("../mocks/flightsArrivals.json");
const mockDepartures = require("../mocks/flightsDepartures.json");

exports.getArrivals = async (req, res) => {
  try {
    const { iataCode } = req.params;

    if (!iataCode) {
      return res.status(400).json({ message: "IATA code is required" });
    }

    const url = `https://aviation-edge.com/v2/public/timetable?key=${API_KEY}&iataCode=${iataCode}&type=arrival`;
    const options = {
      method: "GET",
    };

    let flights = [];

    const cachedKey = `arrivals:${iataCode}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache arrivals from Redis");
      flights = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");
      const response = await fetch(url, options);
      flights = await response.json();
      if (flights.length > 0) {
        flights = flights.filter(
          (flight) => flight.flight && flight.flight.iataNumber !== ""
        );
        await redisClient.set(cachedKey, JSON.stringify(flights), {
          EX: CACHE_TIME,
        });
      }
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

    const url = `https://aviation-edge.com/v2/public/timetable?key=${API_KEY}&iataCode=${iataCode}&type=departure`;
    const options = {
      method: "GET",
    };

    let flights = [];

    const cachedKey = `departures:${iataCode}`;
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      console.log("Cache departures from Redis");
      flights = JSON.parse(cachedData);
    } else {
      console.log("Cache miss, fetching from API");
      const response = await fetch(url, options);
      flights = await response.json();
      if (flights.length > 0) {
        flights = flights.filter(
          (flight) => flight.flight && flight.flight.iataNumber !== ""
        );
        flights = flights.filter((flight) => flight.departure.gate !== null);
        await redisClient.set(cachedKey, JSON.stringify(flights), {
          EX: CACHE_TIME,
        });
      }
    }
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error fetching departures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
