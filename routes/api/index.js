const slowDown = require("express-slow-down");
const rateLimit = require("express-rate-limit");

const api = require("express").Router();

// api.set('trust proxy', 1)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// api.use(limiter);

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
});
// api.use(speedLimiter);

// api.use("/v1", require("./v1"));
api.use("/v2", require("./v2"));

module.exports = api;
