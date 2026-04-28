const { createClient } = require("redis");

const redisClient = createClient(
  process.env.REDIS_URL ? { url: process.env.REDIS_URL } : undefined
);

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.connect().catch((err) => {
  console.error("Redis no disponible, continuando sin caché:", err.message);
});

module.exports = redisClient;
