import React from "react";
import Sidebar from "../Components/AdminSidebar.jsx";
import Header from "../Components/Header.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="mt-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;