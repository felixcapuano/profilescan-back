const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const getPlayerSummaries = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const { data } = await steamInstance.get(
      "/ISteamUser/GetPlayerSummaries/v0002/",
      {
        params: {
          steamids: req.params.id,
        },
      }
    );

    req.data = data.response?.players[0];
    if (!req.data) throw new Error("Player not found");
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/getplayersummaries/:id/", [
  isValidSteamId,
  pullCache,
  getPlayerSummaries,
  pushCache,
  response,
]);

module.exports = router;
