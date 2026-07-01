import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="border p-3 pl-10 rounded-lg w-[350px]"
        />

        <FaSearch className="absolute top-4 left-3 text-gray-500" />
      </div>

      <div className="flex gap-5 items-center">

        <FaBell size={22} />

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="rounded-full"
          />

          <div>
            <h1 className="font-bold">Admin</h1>
            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;