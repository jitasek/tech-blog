const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);

module.exports = router;
