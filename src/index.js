const app = require("./app");
const Logger = require("./utils/logger");

const { PORT, DB } = require("./configs");

const server = app.listen(PORT || 5000, function () {
    Logger.info(`App is running on port ${PORT}`)
});

process.on("uncaughtException", (err) => {
    Logger.warn("Uncaught Exception");
    Logger.error(err.stack);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    Logger.warn("Unhandled Rejection" + err)
});

module.exports = server;