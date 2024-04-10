import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const AppLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
