const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const fetchBans = async (steamids) => {
  const { data } = await steamInstance.get("/ISteamUser/GetPlayerBans/v0001/", {
    params: { steamids },
  });

  return data.players.filter(({ VACBanned }) => VACBanned === true).length;
};

const fetchFriends = async (steamid) => {
  const { data } = await steamInstance.get("/ISteamUser/GetFriendList/v0001/", {
    params: {
      relationship: "friend",
      steamid: steamid,
    },
  });

  return data.friendslist.friends;
};

const getPlayerBans = async (req, res, next) => {
  if (req.data) return await next();

  req.data = {};

  try {
    req.data.userVacBanned = await fetchBans(req.params.id);
  } catch (error) {
    return await next({ status: 404 });
  }

  let friends = [];
  try {
    friends = await fetchFriends(req.params.id);
    req.data.friendCount = friends.length;
  } catch (error) {
    return await next();
  }

  try {
    let banCount = 0;
    while (friends.length > 0) {
      const friendsStr = friends
        .splice(-100)
        .map((f) => f.steamid)
        .join("-");
      banCount += await fetchBans(friendsStr);
    }
    req.data.friendBanned = banCount;
  } catch (error) {
    return await next();
  }
  return await next();
};

router.get("/getplayerbans/:id/", [
  isValidSteamId,
  pullCache,
  getPlayerBans,
  pushCache,
  response,
]);

module.exports = router;
