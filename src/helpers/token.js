const { config } = require("../../config");
const ms = require("ms");
const jwt = require("jsonwebtoken");

const ValidateAuthToken = (token) => {
  return new Promise(function (resolve, reject) {
    jwt.verify(
      token,
      Buffer.from(config.auth.secret, "base64"),
      { ignoreNotBefore: true },
      function (err, payload) {
        if (err) reject(new Error("AuthorizationExpired"));
        resolve(payload);
      }
    );
  });
};

const GenerateAuthToken = (payload) => {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      Buffer.from(config.auth.secret, "base64"),
      {
        audience: config.app.name,
        issuer: config.app.name,
        expiresIn: ms(Number(config.auth.token_expiry)),
      },
      function (err, token) {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

const GenerateToken = (payload) => {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      Buffer.from(config.auth.secret, "base64"),
      {
        audience: config.app.name,
        issuer: config.app.name,
      },
      function (err, token) {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

module.exports = {
  ValidateAuthToken,
  GenerateAuthToken,
  GenerateToken,
};
