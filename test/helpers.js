require("chai").should();
const supertest = require("supertest");
const winston = require("winston");
const fs = require("fs");

const app = require("../entrypoint");
const logger = require("../logging");
const { client } = require("../routes/api/v2/instance/redis");

global.request = supertest(app);

global.constants = {
  steamId: {
    correct: "76561198069504185", //mammoth
    bad: "6561198069504185", //mammoth
    private: "76561197964163827", //Kenshirio
    inexistant: "7656000006950418", //mammoth
  },
  steamAlias: {
    correct: "Xnem",
    bad: "sqdlkflkqsdjflkqdjs",
  },
  faceitId: {
    correct: "87307577-6381-40a5-a7c2-97ba3ec94d55", //mammoth
    bad: "87307577-6381-40a5-a7c2-97ba3ec94d5", //mammoth
  },
};

before(async () => {
  try {
    await client.connect();
    await client.flushAll();
  } catch (error) {
    throw error;
  }
});

beforeEach(async () => {
  logger.clear();
  // logger.add(new winston.transports.Stream({
  //   stream: fs.createWriteStream('/dev/null')
  // }));

  // console.log = (msg) => {
  //   output = "";
  //   console.log = (msg) => {
  //     output += msg + "\n";
  //   };
  // };
});

after(async () => {
  try {
    await client.disconnect();
  } catch (error) {
    throw error;
  }
});
