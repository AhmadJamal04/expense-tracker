import { moneyFormatter } from "../utils/moneyFormatter";

import { useContext, useEffect, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";

export default function Balance() {
  const [total, setTotal] = useState(0);
  const { expenses } = useContext(ExpenseContext);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    expenses.forEach((expenseItem) => {
      if (expenseItem.amount > 0) {
        income += expenseItem.amount;
      } else if (expenseItem.amount < 0) {
        expense += expenseItem.amount;
      }
    });

    const balance = income + expense;
    console.log(balance, income, expense);

    setTotal(balance);
  }, [expenses]);

  return (
    <>
      <h4>Your Balance</h4>
      <h1 className={`${total > 0 ? "text-green-500" : "text-orange-500"}`}>
        {total < 0 ? "-" : ""}
        {moneyFormatter(total)}
      </h1>
    </>
  );
}
