import { Review } from "../models/review.models.js";
import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addReview = asyncHandler(async (req, res) => {

    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        throw new ApiError(
            400,
            "Rating and comment are required"
        );
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Prevent duplicate review

    const alreadyReviewed = await Review.findOne({
        product: productId,
        user: req.user._id
    });

    if (alreadyReviewed) {
        throw new ApiError(
            400,
            "You already reviewed this product"
        );
    }

    const review = await Review.create({
        user: req.user._id,
        product: productId,
        rating,
        comment
    });

    // Recalculate product rating

    const reviews = await Review.find({
        product: productId
    });

    product.numReviews = reviews.length;

    product.averageRating =
        reviews.reduce(
            (acc, item) => acc + item.rating,
            0
        ) / reviews.length;

    await product.save();

    return res.status(201).json(
        new ApiResponse(
            201,
            review,
            "Review added successfully"
        )
    );
});


const getProductReviews = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const reviews = await Review.find({
        product: productId
    })
        .populate(
            "user",
            "fullname username"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            reviews,
            "Reviews fetched successfully"
        )
    );
});


export {
    addReview,
    getProductReviews
};