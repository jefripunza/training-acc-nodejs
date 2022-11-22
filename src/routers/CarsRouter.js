const router = require("express").Router();
const { endpoint } = require("../config");

// ==================================================================================

const controller = require("../controllers/CarsController");

const secure_layer_1 = require("../middlewares/secure_layer_1");
const token_validation = require("../middlewares/token_validation");
const api_validation = require("../middlewares/api_validation");

// ==================================================================================

router.post(
  `${endpoint}/car/search`,
  secure_layer_1,
  token_validation,
  api_validation,
  controller.searchCar
);

// ==================================================================================

module.exports = router;
