const logger = require("../../../../logging");

const response = async (req, res) => {
  logger.info({
    url: req.originalUrl,
    cached: "cacheTime" in req.data,
    status: 200,
  });

  await res.contentType("application/json").status(200).send(req.data);
};

module.exports = response;
