import { Router } from "express";

import {
    createCoupon,
    getCoupons,
    deleteCoupon,
    applyCoupon
} from "../controllers/coupon.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/")
.get(
    verifyJWT,
    verifyAdmin,
    getCoupons
)
.post(
    verifyJWT,
    verifyAdmin,
    createCoupon
);

router.route("/:couponId")
.delete(
    verifyJWT,
    verifyAdmin,
    deleteCoupon
);

router.route("/apply")
.post(
    verifyJWT,
    applyCoupon
);

export default router;