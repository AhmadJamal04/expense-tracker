import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <ToastContainer autoClose={500} position="top-center" />
      <Outlet />
    </div>
  );
};

export default Layout;
