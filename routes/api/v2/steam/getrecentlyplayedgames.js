const router = require("express").Router();
const isValidSteamId = require("../handler/verifySteamId");
const { pullCache, pushCache } = require("../handler/cache");
const steamInstance = require("../instance/steam");
const response = require("../handler/response");

const getRecentlyPlayedGames = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const { data } = await steamInstance.get(
      "/IPlayerService/GetRecentlyPlayedGames/v0001/",
      {
        params: {
          format: "json",
          steamid: req.params.id,
        },
      }
    );
    const games = data.response?.games || [];
    req.data = games.find(({ appid }) => appid === 730);

    if (!req.data) {
      throw new Error("CSGO not played recently");
    }
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/getrecentlyplayedgames/:id/", [
  isValidSteamId,
  pullCache,
  getRecentlyPlayedGames,
  pushCache,
  response,
]);

module.exports = router;
