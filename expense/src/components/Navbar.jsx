import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { logout } from "../services/user";

const Navbar = () => {
  const { token, user, setUser, setToken } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="flex py-10 px-20 justify-end">
      <ul className="flex gap-5 text-xl font-bold text-black">
        {token && (
          <li>
            <Link to="/">Expenses</Link>
          </li>
        )}

        {token && <li>✋{user?.name}</li>}

        {token ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
