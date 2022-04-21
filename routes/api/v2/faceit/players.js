const router = require("express").Router();
const faceitInstance = require("../instance/faceit");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const player = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const faceitRes = await faceitInstance.get("/players", {
      params: {
        game: "csgo",
        game_player_id: req.params.id,
      },
    });

    req.data = faceitRes.data;
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/players/:id/", [
  isValidSteamId,
  pullCache,
  player,
  pushCache,
  response,
]);

module.exports = router;
