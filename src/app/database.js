const typeorm = require("typeorm"); // More : https://orkhan.gitbook.io/typeorm/docs/connection-options#connection-options-example

const { db_config, synchronize, logging } = require("../config");

module.exports = async (cb_ready = false) => {
  await typeorm
    .createConnection({
      name: "default",
      type: "mysql",
      port: 3306,
      ...db_config,
      synchronize,
      logging, // debug query
      entities: require("../models/entities"),
    })
    .then(() => {
      console.log(`Database is connected! (${db_config.database}) (mysql)`);
      if (cb_ready) cb_ready();
    })
    .catch((error) => {
      console.error(`Error connection: ${error.message}`);
      process.exit(1);
    });
};
