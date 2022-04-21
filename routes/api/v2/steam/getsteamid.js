const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");

const getSteamId = async (req, res, next) => {
  if (req.data) return await next();

  try {
    const { data } = await steamInstance.get(
      "/ISteamUser/ResolveVanityURL/v0001/",
      {
        params: {
          vanityurl: req.params.alias,
        },
      }
    );
    if (data.response.success !== 1) {
      return await next({ status: 404 });
    }

    req.data = data.response;
  } catch (error) {
    return await next({ status: 404 });
  }
  return await next();
};

router.get("/getsteamid/:alias/", [pullCache, getSteamId, pushCache, response]);

module.exports = router;
