const path = require("path");
const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const commonMiddleware = require("../middlewares/common.middleware");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.use("/auth", commonMiddleware, authRoutes);
router.use("/access", [commonMiddleware, authMiddleware], accessRoutes);
router.use("/common", [commonMiddleware, authMiddleware], commonRoutes);

module.exports = router;
