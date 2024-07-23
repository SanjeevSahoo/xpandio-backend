const express = require("express");
const accessController = require("../controllers/access.controller");
const router = express.Router();

router.post("/get-app-urlwise", accessController.getUrlWiseApp);
router.post("/get-app-details", accessController.getAppIdWiseApp);
router.post("/get-menu-appwise", accessController.getAppWiseMenus);

module.exports = router;
