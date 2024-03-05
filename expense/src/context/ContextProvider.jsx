import { useState, React } from "react";
import ExpenseContext from "./ExpenseContext";

function ContextProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [expenses, setExpenses] = useState([]);

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    expenses,
    setExpenses,
  };

  return (
    <div>
      <ExpenseContext.Provider value={contextValue}>
        {children}
      </ExpenseContext.Provider>
    </div>
  );
}

export default ContextProvider;
