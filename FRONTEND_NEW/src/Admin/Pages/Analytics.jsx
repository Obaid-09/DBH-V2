import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

    PieChart,
    Pie,
    Cell,

    BarChart,
    Bar
} from "recharts";

const COLORS = [
    "#C9A227",
    "#2b84ea",
    "#61cea6",
    "#f97316",
    "#ef4444"
];

const Analytics = () => {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {

        try {

            const res = await API.get(
                "/admin/analytics",
                {
                    withCredentials: true
                }
            );

            setAnalytics(res.data.data);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to fetch analytics"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <h1 className="text-3xl font-bold">
                    Loading Analytics...
                </h1>
            </div>
        );
    }

    return (

        <div className="space-y-10">

            {/* Heading */}
            <h1 className="text-4xl font-bold">
                Analytics
            </h1>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Revenue
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        ₹{analytics.totalRevenue}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Orders
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {analytics.totalOrders}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Products
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {analytics.totalProducts}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Users
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {analytics.totalUsers}
                    </p>
                </div>

            </div>

            {/* Revenue Chart */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-6">
                    Monthly Revenue
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart
                        data={analytics.monthlyRevenue}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#C9A227"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* Orders Chart */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-6">
                    Monthly Orders
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart
                        data={analytics.monthlyRevenue}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="orders"
                            fill="#C9A227"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* Pie Chart */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-6">
                    Order Status Distribution
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <PieChart>

                        <Pie
                            data={analytics.orderStatusStats}
                            dataKey="count"
                            nameKey="_id"
                            outerRadius={120}
                            label
                        >

                            {
                                analytics.orderStatusStats.map(
                                    (entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )
                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* Top Products */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Top Selling Products
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-4 text-left">
                                Product
                            </th>

                            <th className="text-left">
                                Units Sold
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            analytics.topProducts.map(
                                (product) => (

                                    <tr
                                        key={product._id}
                                        className="border-b"
                                    >

                                        <td className="py-4">
                                            {product.name}
                                        </td>

                                        <td>
                                            {product.sold}
                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Analytics;