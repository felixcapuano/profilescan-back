const { createClient } = require("redis");

let connected = false;

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  // socket: {
  //   host: process.env.REDIS_HOST,
  //   port: process.env.REDIS_PORT,
  // },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  database: process.env.REDIS_DATABASE,
});

client
  .connect()
  .then(() => {
    console.log("Redis Client Connected");
    connected = true;
  })
  .catch((err) => {
    console.error(`Fail to connect with Redis : ${err}`);
  });

const cache = async (req, res, next) => {
  if (!connected) return;
  const path = req.path.split("/");
  req.cacheKey = `${path[1]}_${path[2]}`;

  try {
    const data = await client.get(req.cacheKey);
    if (data) {
      console.log(`GET ${req.originalUrl} "use cache"`);
      return res.send(JSON.parse(data));
    } else return next();
  } catch (error) {
    next();
  }
};

const cacheData = async (key, data) => {
  if (!key || !connected) {
    return console.warn("Skipping : cache middleware missing");
  }
  await client.setEx(key, 3600 * 24, JSON.stringify(data));
};

module.exports = { cache, cacheData };
