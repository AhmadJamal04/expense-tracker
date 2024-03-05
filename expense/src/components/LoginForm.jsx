import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../services/user";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { setUser, setToken } = useContext(ExpenseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("email", email);
    console.log("password ", password);
    const response = await login(email, password);
    if (response.status === 200) {
      const { token, user } = response.data;
      setUser(user);
      setToken(token);
      toast.success("Login successful");
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          value={email}
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <p className="forgot-password text-right">
          Don't Have Account <a href="/signup">Sign Up?</a>
        </p>
      </div>

      <p className="forgot-password text-right">
        Forgot <a href="#">Password?</a>
      </p>
    </form>
  );
}
