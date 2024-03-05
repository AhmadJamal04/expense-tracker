const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const expenseRouter = require("./expense");

router.use("/users", userRouter);
router.use("/expenses", expenseRouter);

module.exports = router;
