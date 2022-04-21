const logger = require("../../../../logging");

const error = async (err, req, res, next) => {
  const status = err.status || 500;
  logger.warn({
    url: req.originalUrl,
    status,
  });
  res.sendStatus(status);
};

module.exports = error;
