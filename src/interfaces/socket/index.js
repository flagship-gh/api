const { ValidateAuthToken } = require("../../helpers/token");

function Init(io) {
  io.use(async function (socket, next) {
    try {
      const authorization = socket.handshake.query.authorization;
      if (!authorization) throw new Error("UnAuthorized");
      let user = await ValidateAuthToken(authorization);
      if (!user) {
        throw new Error("UnAuthorized");
      }
      next();
    } catch (err) {
      next(new Error("UnAuthorized"));
    }
  });
}

module.exports = {
  Init,
};
