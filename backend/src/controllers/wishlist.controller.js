import { Wishlist } from "../models/wishlist.models.js";
import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add Product to Wishlist
const addToWishlist = asyncHandler(async (req, res) => {

    const { productId } = req.body;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let wishlist = await Wishlist.findOne({
        user: req.user._id
    });

    // Create wishlist if it doesn't exist
    if (!wishlist) {

        wishlist = await Wishlist.create({
            user: req.user._id,
            products: [productId]
        });

    } else {

        const alreadyExists = wishlist.products.some(
            (item) => item.toString() === productId
        );

        if (alreadyExists) {
            throw new ApiError(400, "Product already in wishlist");
        }

        wishlist.products.push(productId);
        await wishlist.save();
    }

    wishlist = await Wishlist.findById(wishlist._id)
        .populate("products");

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Product added to wishlist successfully"
        )
    );
});


// Get Wishlist
const getWishlist = asyncHandler(async (req, res) => {

    const wishlist = await Wishlist.findOne({
        user: req.user._id
    }).populate("products");

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist || { products: [] },
            "Wishlist fetched successfully"
        )
    );
});


// Remove Product from Wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
        user: req.user._id
    });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    wishlist.products = wishlist.products.filter(
        (item) => item.toString() !== productId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findById(wishlist._id)
        .populate("products");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedWishlist,
            "Product removed from wishlist successfully"
        )
    );
});

export {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};