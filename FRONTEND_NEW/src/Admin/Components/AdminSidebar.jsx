import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTag
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { path: "/admin", title: "Dashboard", icon: <FaChartPie /> },
    { path: "/admin/products", title: "Products", icon: <FaBox /> },
    { path: "/admin/orders", title: "Orders", icon: <FaShoppingCart /> },
    { path: "/admin/users", title: "Users", icon: <FaUsers /> },
    { path: "/admin/analytics", title: "Analytics", icon: <FaChartBar /> },
    { path: "/admin/coupons", title: "Coupons", icon: <FaTag /> },
    { path: "/admin/settings", title: "Settings", icon: <FaCog /> }
  ];

  return (
    <div className="w-[260px] min-h-screen bg-[#0B1320] text-white p-6">

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#C9A227]">
          DBH
        </h1>
        <p className="text-sm text-gray-400">
          Dubai Burqa House
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition-all
              ${
                isActive
                  ? "bg-[#C9A227] text-black"
                  : "hover:bg-[#1E293B]"
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      <button className="mt-20 w-full bg-red-500 py-3 rounded-lg flex justify-center items-center gap-2">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;