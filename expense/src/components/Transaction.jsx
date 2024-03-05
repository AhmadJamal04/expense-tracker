import React from "react";
import { moneyFormatter } from "../utils/moneyFormatter";
import { deleteExpense } from "../services/expense";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { toast } from "react-toastify";

export default function Transaction({ transaction }) {
  const { expenses, token, user, setExpenses } = useContext(ExpenseContext);

  const ClickHandlerFunction = async () => {
    try {
      const response = await deleteExpense(user.id, token, transaction.id);
      if (response.status === 200) {
        toast.success("Transaction deleted successfully");
        const newExpenses = expenses.filter(
          (expense) => expense.id !== transaction.id
        );
        setExpenses(newExpenses);
      }
    } catch (error) {}
  };
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.description}
      <span>
        {sign}
        {moneyFormatter(transaction.amount)}
      </span>
      <button onClick={ClickHandlerFunction} className="delete-btn">
        x
      </button>
    </li>
  );
}
