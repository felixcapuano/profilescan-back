const { client, isRedisAwake, isRedisConnected } = require("../instance/redis");

const connectToRedis = async () => {
  try {
    await client.connect();
    await client.flushAll();
    console.log("Redis Client Connected");
  } catch (error) {
    console.error(`Fail to connect with Redis : ${error}`);
  }
};

if (!isRedisConnected() && process.env.NODE_ENV !== "test") {
  connectToRedis();
}

const pullCache = async (req, res, next) => {
  if (!(await isRedisAwake())) return await next();

  const path = req.path.split("/");
  req.cacheKey = `${path[1]}_${path[2]}`;

  try {
    const data = await client.get(req.cacheKey);
    req.data = JSON.parse(data);
  } catch (error) {
    return await next({ status: 500 });
  }

  return await next();
};

const pushCache = async (req, res, next) => {
  if (!(await isRedisAwake())) return await next();
  if (!req.cacheKey) return await next();

  try {
    // req.data.cacheTime = Date.now();
    await client.setEx(
      req.cacheKey,
      3600 * 24,
      JSON.stringify({ ...req.data, cacheTime: Date.now() })
    );
  } catch (error) {
    return await next({ status: 500 });
  }

  await next();
};

module.exports = { pullCache, pushCache };
