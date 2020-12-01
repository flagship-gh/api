const router = require("express").Router();

function v1(io) {
  router.use("/status", function (_, res) {
    return res.sendStatus(200);
  });

  return router;
}

module.exports = v1;
