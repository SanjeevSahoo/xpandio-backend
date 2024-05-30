const express = require("express");
const accessController = require("../controllers/access.controller");
const router = express.Router();

router.get("/appaccess", accessController.appaccess);
router.post("/get-menu-access", accessController.getMenuAccess);

module.exports = router;
