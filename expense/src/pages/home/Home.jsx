import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Balance from "../../components/Balance";
import IncomeExpenses from "../../components/IncomeExpenses";
import TransactionList from "../../components/TransactionList";
import AddTransaction from "../../components/AddTransaction";

import ExpenseContext from "../../context/ExpenseContext";

const Home = () => {
  const { user, token, setExpenses } = useContext(ExpenseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [user?.id, token, setExpenses, navigate]);

  return (
    <div className="p-20">
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  );
};

export default Home;
