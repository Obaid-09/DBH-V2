// import React from "react";
// import AdminSidebar from "../Components/AdminSidebar";

// const stats = [
//   {
//     title: "Total Users",
//     value: 156,
//   },
//   {
//     title: "Total Products",
//     value: 45,
//   },
//   {
//     title: "Total Orders",
//     value: 86,
//   },
//   {
//     title: "Revenue",
//     value: "₹1,25,000",
//   },
// ];

// const recentOrders = [
//   {
//     id: "#1234",
//     customer: "Obaid",
//     amount: "₹2999",
//     status: "Shipped",
//   },
//   {
//     id: "#1235",
//     customer: "Ahmed",
//     amount: "₹3499",
//     status: "Processing",
//   },
//   {
//     id: "#1236",
//     customer: "Fatima",
//     amount: "₹4999",
//     status: "Delivered",
//   },
// ];

// const AdminDashboard = () => {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">

//       <AdminSidebar />

//       <div className="flex-1 p-8">

//         <h1 className="text-3xl font-bold mb-8">
//           Dashboard
//         </h1>

//         {/* Stats Cards */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md p-6"
//             >
//               <h2 className="text-gray-500 text-lg">
//                 {stat.title}
//               </h2>

//               <p className="text-3xl font-bold mt-3 text-[#C9A227]">
//                 {stat.value}
//               </p>
//             </div>
//           ))}

//         </div>

//         {/* Recent Orders */}

//         <div className="bg-white mt-10 rounded-xl shadow-md p-6">

//           <h2 className="text-2xl font-semibold mb-6">
//             Recent Orders
//           </h2>

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead>
//                 <tr className="border-b">

//                   <th className="text-left py-4">
//                     Order ID
//                   </th>

//                   <th className="text-left py-4">
//                     Customer
//                   </th>

//                   <th className="text-left py-4">
//                     Amount
//                   </th>

//                   <th className="text-left py-4">
//                     Status
//                   </th>

//                 </tr>
//               </thead>

//               <tbody>

//                 {recentOrders.map((order) => (
//                   <tr
//                     key={order.id}
//                     className="border-b"
//                   >
//                     <td className="py-4">
//                       {order.id}
//                     </td>

//                     <td className="py-4">
//                       {order.customer}
//                     </td>

//                     <td className="py-4">
//                       {order.amount}
//                     </td>

//                     <td className="py-4">

//                       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                         {order.status}
//                       </span>

//                     </td>
//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import StatCard from "../Components/StatCard";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign
} from "react-icons/fa";

import API from "../../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {

    try {

      const res = await API.get(
        "/admin/dashboard",
        {
          withCredentials: true
        }
      );

      setStats(res.data.data);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to load dashboard stats"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={<FaRupeeSign />}
        />

        <StatCard
          title="Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart />}
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={<FaBox />}
        />

        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
        />

      </div>

    </div>
  );
};

export default Dashboard;