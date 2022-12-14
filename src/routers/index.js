const express = require("express");

/**
 * @param {express.Application} app
 */
module.exports = (app) => {
  // Register router here...

  app.use(require("./AuthRouter"));
  app.use(require("./BrandsRouter"));
  app.use(require("./CarsRouter"));
  app.use(require("./HelpRouter"));
  // index
  app.use(require("./UsersRouter"));
};
