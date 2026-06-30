import { Router } from "express";
import {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} from "../controllers/cart.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add")
.post(
    verifyJWT,
    addToCart
);

router.route("/")
.get(
    verifyJWT,
    getCart
);

router.route("/update")
.patch(
    verifyJWT,
    updateCart
);

router.route("/remove/:productId")
.delete(
    verifyJWT,
    removeFromCart
);

export default router;