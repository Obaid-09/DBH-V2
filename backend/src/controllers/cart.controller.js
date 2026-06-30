import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const addToCart = asyncHandler(async (req, res) => {

    const { productId, quantity = 1, size } = req.body;

    if (!size) {
        throw new ApiError(400, "Size is required");
    }
    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let cart = await Cart.findOne({
        user: req.user._id
    });

    // Create cart if not exists
    if (!cart) {

        cart = await Cart.create({
            user: req.user._id,
            items: [
                {
                    product: productId,
                    quantity, 
                    size
                }
            ]
        });

    } else {

        // Check if product already exists in cart
        // const itemIndex = cart.items.findIndex(
        //     item => item.product.toString() === productId
        // );
        const itemIndex = cart.items.findIndex(
            item =>
                item.product.toString() === productId &&
                item.size === size
        );

        if (itemIndex > -1) {

            // Increase quantity
            cart.items[itemIndex].quantity += Number(quantity);

        } else {

            cart.items.push({
                product: productId,
                quantity, 
                size
            });

        }

        await cart.save();
    }

    cart = await Cart.findById(cart._id)
        .populate("items.product");

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Product added to cart successfully"
        )
    );
});


const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");

    if (!cart) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { items: [] },
                "Cart is empty"
            )
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart fetched successfully"
        )
    );
});


const updateCart = asyncHandler(async (req, res) => {

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        throw new ApiError(400, "Product ID and quantity are required");
    }

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        item => item.product.toString() === productId
    );

    if (!item) {
        throw new ApiError(404, "Product not found in cart");
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.product");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedCart,
            "Cart updated successfully"
        )
    );
});


const removeFromCart = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        throw new ApiError(404, "Product not found in cart");
    }

    // Decrease quantity if greater than 1
    if (cart.items[itemIndex].quantity > 1) {

        cart.items[itemIndex].quantity--;

    } else {

        // Remove completely if quantity becomes 0
        cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.product");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedCart,
            "Cart updated successfully"
        )
    );
});


export {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
}