import { Router } from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} from "../controllers/order.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
    .post(
        verifyJWT,
        createOrder
    )
    .get(
        verifyJWT,
        getAllOrders
    );

router.route("/my-orders")
    .get(
        verifyJWT,
        getMyOrders
    );

router.route("/:orderId")
    .get(
        verifyJWT,
        getOrderById
    )
    .patch(
        verifyJWT,
        updateOrderStatus
    );

export default router;