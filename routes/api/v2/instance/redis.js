const { createClient } = require("redis");

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  database: process.env.REDIS_DATABASE,
});

const isRedisAwake = async () => {
  try {
    const ping = await client.ping();
    return ping === "PONG";
  } catch (error) {
    console.log("Redis is not awake.");
    return false;
  }
};

let ready = false;
client.on("ready", () => (ready = true));
const isRedisReady = () => ready;

let connected = false;
client.on("connect", () => (connected = true));
const isRedisConnected = () => connected;

module.exports = { client, isRedisAwake, isRedisReady, isRedisConnected };
