import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/user";
import ExpenseContext from "../context/ExpenseContext";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const { setUser, setToken } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password);
    if (res.status === 201) {
      // Clear the form
      setName("");
      setEmail("");
      setPassword("");

      // Set user and token in context
      setUser(res.data.user);
      setToken(res.data.token);

      //show success message
      toast.success("Signup successful");

      // Redirect to home page
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold">Sign Up</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Sign in?</a>
      </p>
    </form>
  );
}
