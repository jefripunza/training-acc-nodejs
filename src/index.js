const { isProduction } = require("./consts");

// ---------------------------------------------------------------------

require("./utils/init_logger");

const { app, server } = require("./app/server");

require("./app/database")(() => {
  server.listen(app.get("port"), () => {
    console.log(`Service running at ${app.get("port")}`);
  });
});
