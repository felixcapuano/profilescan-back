// or  GetUserStatsForGame ???
const router = require("express").Router();
const { cache, cacheData } = require("../redisInstance");
const steamInstance = require("./steamInstance");

router.get("/getplayerachievements/:id/", cache, async (req, res) => {
  try {
    const steamResponse = await steamInstance.get(
      "/ISteamUserStats/GetPlayerAchievements/v0001/",
      {
        params: {
          appid: "730",
          steamid: req.params.id,
        },
      }
    );

    await cacheData(req.cacheKey, steamResponse.data.playerstats);

    console.log(`GET ${req.originalUrl}`);
    return await res
      .status(200)
      .contentType("application/json")
      .send(steamResponse.data.playerstats);
  } catch (error) {
    const errorMsg = "Steamid is invalid or/and player has no record for csgo.";
    console.error(`GET ${req.originalUrl} "${errorMsg}"`);
    return await res.status(404).send(error);
  }
});

module.exports = router;
