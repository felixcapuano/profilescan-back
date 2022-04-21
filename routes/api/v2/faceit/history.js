const router = require("express").Router();
const faceitInstance = require("../instance/faceit");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidFaceitId = require("../handler/verifyFaceitId");

const history = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const faceitRes = await faceitInstance.get(
      `/players/${req.params.id}/history`,
      {
        params: {
          game: "csgo",
          offset: 0,
          limit: 20,
        },
      }
    );

    req.data = faceitRes.data;
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/history/:id/", [
  isValidFaceitId,
  pullCache,
  history,
  pushCache,
  response,
]);

module.exports = router;
