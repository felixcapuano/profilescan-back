const router = require("express").Router();
const steamInstance = require("./steamInstance");
const { cache, cacheData } = require("../redisInstance");

router.get("/getfriendlist/:id/", cache, async (req, res) => {
  try {
    const steamResponse = await steamInstance.get(
      "/ISteamUser/GetFriendList/v0001/",
      {
        params: {
          relationship: "friend",
          steamid: req.params.id,
        },
      }
    );
    await cacheData(req.cacheKey, steamResponse.data.friendslist);

    console.log(`GET ${req.originalUrl}`);
    return await res
      .status(200)
      .contentType("application/json")
      .send(steamResponse.data.friendslist);
  } catch (error) {
    const errorMsg = "The steam id is invalid or player has no friend.";
    console.error(`GET ${req.originalUrl} "${errorMsg}"`);
    return await res.status(404).send(error);
  }
});

module.exports = router;
