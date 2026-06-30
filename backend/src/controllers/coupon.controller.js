import { Coupon } from "../models/coupon.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createCoupon = asyncHandler(async (req, res) => {

    const {
        code,
        discount,
        expiryDate
    } = req.body;

    const coupon = await Coupon.create({
        code,
        discount,
        expiryDate
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            coupon,
            "Coupon created successfully"
        )
    );
});


const getCoupons = asyncHandler(async (req, res) => {

    const coupons = await Coupon.find({})
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            coupons,
            "Coupons fetched successfully"
        )
    );
});


const deleteCoupon = asyncHandler(async (req, res) => {

    const { couponId } = req.params;

    await Coupon.findByIdAndDelete(
        couponId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Coupon deleted successfully"
        )
    );
});


const applyCoupon = asyncHandler(async (req, res) => {

    const { code } = req.body;

    const coupon = await Coupon.findOne({
        code: code.toUpperCase(),
        isActive: true
    });

    if (!coupon) {
        throw new ApiError(
            404,
            "Invalid coupon"
        );
    }

    if (coupon.expiryDate < new Date()) {
        throw new ApiError(
            400,
            "Coupon expired"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            coupon,
            "Coupon applied successfully"
        )
    );
});

export {
    createCoupon,
    getCoupons,
    deleteCoupon,
    applyCoupon
};