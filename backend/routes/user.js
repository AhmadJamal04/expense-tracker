const { Router } = require("express");
const router = Router();
const checkUser = require("./middlewares/checkUser");

// Middlewares

// Controllers
const controller = require("../controllers/user");

// Routes
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

module.exports = router;
