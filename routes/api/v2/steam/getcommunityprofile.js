const router = require("express").Router();
const { parseStringPromise } = require("xml2js");
const axios = require("axios");
const response = require("../handler/response");

const getCommunityProfile = async (req, res, next) => {
  if (req.data) await next();
  if (!req.query.path) return await next({ status: 400 });

  req.steamLink = "https://steamcommunity.com" + req.query.path;

  try {
    const steamPageXml = await axios.get(req.steamLink, {
      params: { xml: 1 },
    });
    const { profile } = await parseStringPromise(steamPageXml.data);
    req.data = profile;
    if (!profile) throw new Error("Profile not found.");
    req.data.steamLink = [req.steamLink];
  } catch (error) {
    return await next({ status: 404 });
  }

  // formatting object by removing useless Array
  Object.keys(req.data).forEach((key) => {
    req.data[key] = req.data[key][0];
  });

  return await next();
};

router.get("/getcommunityprofile", [
  // pullCache,
  getCommunityProfile,
  // pushCache,
  response,
]);

module.exports = router;
