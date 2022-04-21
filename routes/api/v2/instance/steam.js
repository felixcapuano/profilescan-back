const axios = require("axios");

const instance = axios.create({
  baseURL: "http://api.steampowered.com/",
  params: {
    key: process.env.STEAM_API_KEY,
  },
});

module.exports = instance;
