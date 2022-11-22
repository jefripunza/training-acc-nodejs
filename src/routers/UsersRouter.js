const router = require("express").Router();
const { endpoint } = require("../config");

// ==================================================================================

const controller = require("../controllers/UsersController");

const secure_layer_1 = require("../middlewares/secure_layer_1");
const token_validation = require("../middlewares/token_validation");
const only_admin = require("../middlewares/only_admin");
const api_validation = require("../middlewares/api_validation");

// ==================================================================================

router.post(
  `${endpoint}/user`,
  secure_layer_1,
  token_validation,
  only_admin,
  api_validation,
  controller.createUser
);

router.get(
  `${endpoint}/user/:show/:page/:orderby/:keyword`,
  secure_layer_1,
  token_validation,
  controller.readUserPagination
);

router.patch(
  `${endpoint}/user`,
  secure_layer_1,
  token_validation,
  only_admin,
  api_validation,
  controller.updateUser
);

router.delete(
  `${endpoint}/user/:id`,
  secure_layer_1,
  token_validation,
  only_admin,
  api_validation,
  controller.deleteUser
);

// ==================================================================================

module.exports = router;
