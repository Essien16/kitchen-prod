const morgan = require("morgan");
const Logger = require("./logger");
const moment = require("moment");
const { response } = require("express");

const stream = {
    write: (message) => Logger.http(message),
};

morgan.token("ip", (request, response) => request.ip);
morgan.token("timestamp", () => moment().format());

const morganMiddleware = morgan(
    ":method :url :status -- :response-time ms :ip",
    { stream }
);

module.exports = morganMiddleware;