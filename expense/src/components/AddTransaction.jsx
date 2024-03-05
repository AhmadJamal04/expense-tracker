import { useState } from "react";

import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { toast } from "react-toastify";

import { addExpense, getExpenses } from "../services/expense";

export default function AddTransaction() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const { user, token, setExpenses } = useContext(ExpenseContext);

  async function transaction() {
    // validate the form
    if (amount === 0) {
      toast.error("Amount cannot be 0");
      return;
    }

    if (description === "") {
      toast.error("Description cannot be empty");
      return;
    }

    const userId = user.id;

    try {
      const response = await addExpense(userId, token, {
        description,
        amount,
        category,
      });
      if (response.status === 201) {
        const expenses = await getExpenses(user.id, token);

        toast.success("Transaction added successfully");
        setExpenses(expenses.data.data);
        // clear the form
        setDescription("");
        setAmount(0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    transaction();
    setDescription("");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>

        <div className="form-control py-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2"
          >
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="others">Others</option>
          </select>
        </div>

        {token ? (
          <button className="btn">Add transaction</button>
        ) : (
          "your not yet login"
        )}
      </form>
    </>
  );
}
