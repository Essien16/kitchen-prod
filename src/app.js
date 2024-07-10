// const express = require("express");
// const session = require("express-session");
// const cors = require("cors");
// const apiRoutes = require("./routes/v1");
// const helmet = require("helmet");
// const morganMiddleware = require("./utils/morgan");

// const app = express();

// import('express-request-id').then((module) => {
//     const addRequestId = module.default;
    
//     app.use(addRequestId());
  
//     app.set("trust proxy", true);
//     app.use(
//       session({ secret: "welcometochowdeck", saveUninitialized: true, resave: true })
//     );
//     app.use(express.json({ limit: "5mb" }));
//     app.use(express.urlencoded({ limit: "5mb", extended: true }));
//     app.use(helmet());
//     app.use(
//       cors({
//         origin: function (origin, callback) {
//           return callback(null, true);
//         },
//       })
//     );
//     app.use(morganMiddleware);
//     app.use("/api/v1", apiRoutes);
  
//     app.use("**", (req, res, next) => {
//       let err = {};
//       err.message = `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`;
//       err.code = 404;
//       err.isOperational = true;
//       next(err);
//     });
//   });
  
// module.exports = app;

//PS: I DID THIS BECAUSE THE express-request-id MIDDLEWARE was giving me issues when I was testing

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const apiRoutes = require("./routes/v1");
const morganMiddleware = require("./utils/morgan");
//const addRequestId = require('express-request-id')();

const app = express();

app.set("trust proxy", true);
//app.use(addRequestId);
app.use(session({ secret: "welcometochowdeck", saveUninitialized: true, resave: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    return callback(null, true);
  },
}));
app.use(morganMiddleware);
app.use("/api/v1", apiRoutes);

app.use("**", (req, res, next) => {
  let err = {};
  err.message = `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`;
  err.code = 404;
  err.isOperational = true;
  next(err);
});

module.exports = app;
