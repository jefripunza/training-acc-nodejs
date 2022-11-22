const router = require("express").Router();

// ==================================================================================

const controller = require("../controllers/HelpController");

// ==================================================================================

router.get("/log", controller.log);

// ==================================================================================

module.exports = router;
