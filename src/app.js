var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");

var app = express();

console.log('PROCESS.ENV.NODE_ENV', process.env.NODE_ENV)
// const whitelist =
//   process.env.NODE_ENV === "development" ? "*" : ["http://localhost:3000"];
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;