const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const getFriendList = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const steamRes = await steamInstance.get(
      "/ISteamUser/GetFriendList/v0001/",
      {
        params: {
          relationship: "friend",
          steamid: req.params.id,
        },
      }
    );

    req.data = steamRes.data.friendslist;
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/getfriendlist/:id/", [
  isValidSteamId,
  pullCache,
  getFriendList,
  pushCache,
  response,
]);

module.exports = router;
