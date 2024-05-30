const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/refreshtoken", authController.refreshToken);
router.get("/alllocations", authController.alllocations);
router.post("/logout", authController.logout);
router.post("/logoutConcurrentLogin", authController.logoutConcurrentLogin);
router.post("/getUserEmail", authController.getUserEmail);

module.exports = router;
