const { createGraphQl } = require("./interfaces/graphQl");
const { createRest } = require("./interfaces/rest");
const { config } = require("../config");
const { createServer } = require("http");
const os = require("os");

async function start() {
  const app = createRest();
  const server = createServer(app);
  const graphQl = createGraphQl();

  graphQl.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  server.listen(
    {
      port: config.app.port,
    },
    function () {
      console.log(`🎯 server running at ${os.hostname}:${config.app.port}`);
    }
  );
}

module.exports = {
  start,
};
