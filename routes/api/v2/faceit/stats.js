const router = require("express").Router();
const faceitInstance = require("../instance/faceit");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidFaceitId = require("../handler/verifyFaceitId");

const stats = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const faceitRes = await faceitInstance.get(
      `/players/${req.params.id}/stats/csgo`
    );

    req.data = faceitRes.data;
  } catch ({ response }) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/stats/:id/", [
  isValidFaceitId,
  pullCache,
  stats,
  pushCache,
  response,
]);

module.exports = router;
