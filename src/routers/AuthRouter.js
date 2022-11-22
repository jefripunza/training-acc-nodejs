const router = require("express").Router();
const { endpoint } = require("../config");

// ==================================================================================

const controller = require("../controllers/AuthController");

const basic_auth_validation = require("../middlewares/basic_auth_validation");
const token_validation = require("../middlewares/token_validation");
const api_validation = require("../middlewares/api_validation");

// ==================================================================================

router.post(`${endpoint}/auth/login`, basic_auth_validation, controller.login);
router.post(`${endpoint}/auth/login-gt`, controller.loginGT);

router.get(
  `${endpoint}/auth/refresh-token`,
  token_validation,
  api_validation,
  controller.refreshToken
);

// ==================================================================================

module.exports = router;
