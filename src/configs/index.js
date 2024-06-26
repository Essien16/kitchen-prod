require("dotenv").config();
const database = require("./database")

module.exports = {
    PORT: process.env.PORT,
    DB: database,
    NODE_ENV: process.env.NODE_ENV
};