const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const v1 = require("./v1");

function CreateRest() {
  const app = express();
  app.use(cors());
  app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization, HTTP_VERIF_HASH"
    );
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/health", function (_, res) {
    return res.sendStatus(200);
  });
  app.use("/api/v1", v1());

  return app;
}

module.exports = {
  createRest: CreateRest,
};
