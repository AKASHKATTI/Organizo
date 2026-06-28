const express = require("express");

const router = express.Router();

const { getDailyStats } = require("../controllers/stats.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/get-daily-stats", authMiddleware, getDailyStats);

module.exports = router;