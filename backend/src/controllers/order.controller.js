import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createOrder = asyncHandler(async (req, res) => {

    const { shippingAddress, paymentMethod, discount = 0 } = req.body;

    if (!shippingAddress) {
        throw new ApiError(400, "Shipping address is required");
    }

    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {

        totalAmount += item.product.price * item.quantity;

        return {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        };
    });

    if(discount > 0){
        totalAmount =
            totalAmount - (totalAmount * discount) / 100;
    }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount
    });

    // Clear Cart
    cart.items = [];
    await cart.save();

    return res.status(201).json(
        new ApiResponse(
            201,
            order,
            "Order placed successfully"
        )
    );
});


const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id
    })
    .populate("orderItems.product")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully"
        )
    );
});


const getOrderById = asyncHandler(async (req, res) => {

    const { orderId } = req.params;

    const order = await Order.findById(orderId)
        .populate("orderItems.product")
        .populate("user", "fullname email");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully"
        )
    );
});


const getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({})
        .populate("user", "fullname email")
        .populate("orderItems.product")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "All orders fetched successfully"
        )
    );
});


const updateOrderStatus = asyncHandler(async (req, res) => {

    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order status updated successfully"
        )
    );
});


export {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};