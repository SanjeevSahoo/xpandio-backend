const express = require("express");
const commonController = require("../controllers/common.controller");
const router = express.Router();

router.get("/get-db-date", commonController.getDBDate);

module.exports = router;
