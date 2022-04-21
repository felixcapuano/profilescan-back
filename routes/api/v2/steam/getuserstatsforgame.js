const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const getUserStatsForGame = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const { data } = await steamInstance.get(
      "/ISteamUserStats/GetUserStatsForGame/v0002/",
      {
        params: {
          appid: "730",
          steamid: req.params.id,
        },
      }
    );

    req.data = data.playerstats;
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/getuserstatsforgame/:id/", [
  isValidSteamId,
  pullCache,
  getUserStatsForGame,
  pushCache,
  response,
]);

module.exports = router;
