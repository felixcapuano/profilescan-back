const router = require("express").Router();
const { cache, cacheData } = require("../redisInstance");
const steamInstance = require("./steamInstance");

router.get("/getrecentlyplayedgames/:id/", cache, async (req, res) => {
  try {
    const steamResponse = await steamInstance.get(
      "/IPlayerService/GetRecentlyPlayedGames/v0001/",
      {
        params: {
          format: "json",
          steamid: req.params.id,
        },
      }
    );

    await cacheData(req.cacheKey, steamResponse.data.response);

    console.log(`GET ${req.originalUrl}`);
    return await res
      .status(200)
      .contentType("application/json")
      .send(steamResponse.data.response);
  } catch (error) {
    const errorMsg =
      "The steam id is invalid or player has no recent played games.";
    console.error(`GET ${req.originalUrl} "${errorMsg}"`);
    return await res.status(404).send(error);
  }
});

module.exports = router;
