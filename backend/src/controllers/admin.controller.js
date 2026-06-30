import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";

const getDashboardStats = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach(order => {
        totalRevenue += order.totalAmount;
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue
            },
            "Dashboard stats fetched successfully"
        )
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
        .select("-password -refreshToken")
        .sort({ createdAt: -1 });
    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});


const updateUserRole = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
        throw new ApiError(400, "Invalid role");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.role = role;
    await user.save();
    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User role updated successfully"
        )
    );
});


const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    await User.findByIdAndDelete(userId);
    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User deleted successfully"
        )
    );
});


const getAnalytics = asyncHandler(async (req, res) => {

    // Basic Stats
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Revenue
    const revenueResult = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalAmount"
                }
            }
        }
    ]);

    const totalRevenue =
        revenueResult.length > 0
            ? revenueResult[0].totalRevenue
            : 0;

    // Monthly Revenue
    const monthlyRevenue = await Order.aggregate([
        {
            $group: {
                _id: {
                    month: {
                        $month: "$createdAt"
                    }
                },
                revenue: {
                    $sum: "$totalAmount"
                },
                orders: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                "_id.month": 1
            }
        }
    ]);

    const months = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    const formattedMonthlyRevenue = months.map(
        (month, index) => {

            const found = monthlyRevenue.find(
                item => item._id.month === index + 1
            );

            return {
                month,
                revenue: found ? found.revenue : 0,
                orders: found ? found.orders : 0
            };
        }
    );

    // Order Status Stats
    const orderStatusStats = await Order.aggregate([
        {
            $group: {
                _id: "$orderStatus",
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    // Top Selling Products
    const topProducts = await Order.aggregate([
        {
            $unwind: "$orderItems"
        },
        {
            $group: {
                _id: "$orderItems.product",
                sold: {
                    $sum: "$orderItems.quantity"
                }
            }
        },
        {
            $sort: {
                sold: -1
            }
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $project: {
                _id: 1,
                sold: 1,
                name: "$product.name"
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                monthlyRevenue:
                    formattedMonthlyRevenue,
                orderStatusStats,
                topProducts
            },
            "Analytics fetched successfully"
        )
    );
});

export {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAnalytics
};