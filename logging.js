const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.colorize(),
    format.printf((info) => {
      let log = `${info.level} ${info.timestamp}  GET ${info.message.url}`;
      if (info.level.includes("info")) {
        log += ` cached=${info.message.cached}`;
      }
      return log;
    })
  ),
  transports: [new transports.Console({ level: "info" })],
});

// if (process.env.NODE_ENV === "development") {
//   logger.exceptions.handle(
//     new transports.Console()
//   );
// }

module.exports = logger;
