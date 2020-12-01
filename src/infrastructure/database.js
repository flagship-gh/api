const { config } = require("../../config");
const mongoose = require("mongoose");

const owner = "arkhurst";

async function Connect() {
  try {
    console.log(`Connecting to ${owner}'s database`);
    await mongoose.connect(config.database.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("Hurray, database connected successfully");
  } catch (err) {
    console.log(err);
    Connect();
  }
}

module.exports = {
  Connect,
};
