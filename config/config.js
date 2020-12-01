require("dotenv").config();

module.exports = {
  app: {
    env: process.env.NODE_ENV || "development",
    name: process.env.APP_NAME || "Booking App",
    hostName: process.env.HOSTNAME || "localhost",
    port: process.env.PORT || "5000",
  },
  auth: {
    secret: process.env.AUTH_SECRET || "this+is+a+secret",
    temp_secret: process.env.TEMP_SECRET || "this+is+a+temp+secret",
    perm_secret: process.env.PERM_SECRET || "this+is+a+perm+secret",
    token_expiry: process.env.AUTH_TOKEN_EXPIRY || 2.592e9,
    code_expiry: process.env.AUTH_CODE_EXPIRY || 300000,
  },
  database: {
    uri: process.env.MONGO_DATABASE_URI,
  },
};
