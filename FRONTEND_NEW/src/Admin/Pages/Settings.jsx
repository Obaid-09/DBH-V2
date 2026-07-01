import React from "react";

const Settings = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-8">
        Store Settings
      </h1>

      <div className="space-y-6">

        <div>
          <label className="block mb-2 font-semibold">
            Store Name
          </label>

          <input
            type="text"
            defaultValue="Dubai Burqa House"
            className="border p-3 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Contact Email
          </label>

          <input
            type="email"
            defaultValue="info@dubaiburqahouse.com"
            className="border p-3 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Contact Number
          </label>

          <input
            type="text"
            defaultValue="+91 70134 17477"
            className="border p-3 rounded w-full"
          />
        </div>

        <button className="bg-[#C9A227] text-white px-8 py-3 rounded">
          Save Settings
        </button>

      </div>
    </div>
  );
};

export default Settings;