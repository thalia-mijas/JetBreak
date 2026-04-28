const { createClient } = require("redis");

let redisClient = null;

const initRedis = async () => {
  const redisUrl = process.env.REDIS_URL;

  if (
    !redisUrl ||
    (!redisUrl.startsWith("redis://") && !redisUrl.startsWith("rediss://"))
  ) {
    console.log("Redis no configurado, continuando sin caché");
    return;
  }

  try {
    redisClient = createClient({ url: redisUrl });
    redisClient.on("error", (err) =>
      console.error("Redis Error:", err.message),
    );
    await redisClient.connect();
    console.log("✓ Redis conectado");
  } catch (err) {
    console.error("Redis no disponible:", err.message);
    redisClient = null;
  }
};

initRedis();

module.exports = {
  getClient: () => redisClient,
  isAvailable: () => redisClient !== null && redisClient.isReady,
};
