const { Expenses } = require("../models");
const { generateErrorInstance } = require("../utils");
module.exports = {
  addExpense: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { description, amount, category } = req.body;
      if (!description && !amount && !category) {
        throw generateErrorInstance({
          status: 400,
          message: "required fields cannot be empty",
        });
      }
      const expense = await Expenses.create({
        description,
        amount,
        category,
        user_id: userId,
      });
      res.status(201).json({
        status: "success",
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },
  getExpenses: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const expenses = await Expenses.findAll({ where: { user_id: userId } });
      if (!expenses) {
        throw generateErrorInstance({
          status: 404,
          message: "no expense found",
        });
      }
      res.status(200).json({
        status: "success",
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  },
  updateExpense: async (req, res, next) => {
    try {
      const { expenseId } = req.params;
      const { description, amount, category } = req.body;
      const updatedExpense = await Expenses.update(
        { description, amount, category },
        { where: { id: expenseId }, individualHooks: true }
      );
      res.status(200).json({
        status: "success",
        data: updatedExpense,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteExpense: async (req, res, next) => {
    try {
      const { expenseId } = req.params;
      const expense = await Expenses.findOne({ where: { id: expenseId } });
      if (!expense) {
        throw generateErrorInstance({
          status: 404,
          message: "no expense found",
        });
      }
      await Expenses.destroy({ where: { id: expenseId } });
      res.status(200).send("expense deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
