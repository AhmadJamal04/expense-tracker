import { moneyFormatter } from "../utils/moneyFormatter";
import { useContext, useEffect, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";

export default function IncomeExpenses() {
  const { expenses, token } = useContext(ExpenseContext);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const amounts = expenses.map((expense) => expense.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    setIncome(income);
    const expense = (
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    setExpense(expense);
  }, [expenses, token]);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{token ? moneyFormatter(income) : "00.00"}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">
          {token ? moneyFormatter(expense) : "00.00"}
        </p>
      </div>
    </div>
  );
}
