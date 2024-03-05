import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "./context/ContextProvider";
import React from "react";

function App() {
  return (
    <div className="w-[100vw]">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="*"
                element={
                  <div>
                    <h1>404</h1>
                    <p>Page not found</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
