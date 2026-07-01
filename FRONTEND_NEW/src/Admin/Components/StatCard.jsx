import React from "react";

const StatCard = ({
  title,
  value,
  icon
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">
            {title}
          </p>

          <h1 className="text-4xl font-bold mt-3">
            {value}
          </h1>
        </div>

        <div className="text-4xl text-[#C9A227]">
          {icon}
        </div>
      </div>

    </div>
  );
};

export default StatCard;