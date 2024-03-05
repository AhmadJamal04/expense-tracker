const { Router } = require("express");
const checkUser = require("./middlewares/checkUser");
const router = Router();
const controller = require("../controllers/expense");

router.post("/:id", checkUser, controller.addExpense);
router.get("/:id", checkUser, controller.getExpenses);

router.patch("/:expenseId/:id", checkUser, controller.updateExpense);
router.delete("/:expenseId/:id", checkUser, controller.deleteExpense);

module.exports = router;
