const axios = require("axios");

const instance = axios.create({
  baseURL: "https://open.faceit.com/data/v4/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
  },
});

module.exports = instance;
