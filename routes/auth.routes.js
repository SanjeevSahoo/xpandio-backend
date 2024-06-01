const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/refreshtoken", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/logoutConcurrentLogin", authController.logoutConcurrentLogin);

module.exports = router;
