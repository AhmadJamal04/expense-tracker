import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Transaction from "./Transaction";

import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { getExpenses } from "../services/expense";

export default function TransactionList() {
  const { user, token, expenses, setExpenses } = useContext(ExpenseContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const expenses = await getExpenses(user.id, token);
      if (expenses.status === 200) {
        setExpenses(expenses.data.data);
      } else {
        navigate("/login");
      }
    })();
  }, [user?.id, token, setExpenses, navigate]);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {expenses.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}
