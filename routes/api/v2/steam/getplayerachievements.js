const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const getPlayerAchievements = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const steamRes = await steamInstance.get(
      "/ISteamUserStats/GetPlayerAchievements/v0001/",
      {
        params: {
          appid: "730",
          steamid: req.params.id,
        },
      }
    );

    req.data = steamRes.data.playerstats;
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/getplayerachievements/:id/", [
  isValidSteamId,
  pullCache,
  getPlayerAchievements,
  pushCache,
  response,
]);

module.exports = router;
