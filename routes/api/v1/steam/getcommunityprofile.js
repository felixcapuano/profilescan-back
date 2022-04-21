const router = require("express").Router();
const { parseStringPromise } = require("xml2js");
const axios = require("axios");

router.get("/getcommunityprofile", async (req, res) => {
  if (!req.query.path) {
    return res.status(400).send("'path' must be set in the request query");
  }
  req.steamLink = `https://steamcommunity.com/${req.query.path}?xml=1`;

  let steamPageXml;
  try {
    steamPageXml = await axios.get(req.steamLink);
  } catch (error) {
    console.error(`GET ${req.originalUrl} "Failed to fetch steam profile"`);
    return res.status(404).send(`Steam profile not found`);
  }

  let steamPageObj;
  try {
    steamPageObj = await parseStringPromise(steamPageXml.data);
  } catch (error) {
    console.error(`GET ${req.originalUrl} "Failed to parse xml"`);
    return res.status(404).send(`${req.params.userId} Steam profile not found`);
  }

  if (steamPageObj.response?.error) {
    console.error(
      `GET ${req.originalUrl} "${steamPageObj.response.error.toString()}"`
    );
    return res.status(404).send(`${req.params.userId} Steam profile not found`);
  }
  console.log(`GET ${req.originalUrl}`);
  return res.status(200).contentType("application/json").send(steamPageObj);
});

module.exports = router;
