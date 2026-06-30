import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category,
        price,
        originalPrice,
        stock,
        sizes,
        featured
    } = req.body;

    if (
        !name?.trim() ||
        !description?.trim() ||
        !category?.trim() ||
        !price
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const imageLocalPaths = req.files;

    if(!imageLocalPaths?.length){
        throw new ApiError(400, "Product images are required");
    }

    let imageUrls = [];

    for(const file of imageLocalPaths){

        const uploadedImage =
            await uploadOnCloudinary(file.path);

        if(uploadedImage){
            imageUrls.push(uploadedImage.secure_url);
        }
    }

    if (imageUrls.length === 0) {
        throw new ApiError(400, "Error while uploading product images");
    }

    let parsedSizes = [];

    try {
        parsedSizes = JSON.parse(sizes);
    } catch (error) {
        throw new ApiError(400, "Invalid sizes format");
    }

    const product = await Product.create({
        name,
        description,
        category,
        price,
        originalPrice,
        stock,
        sizes: parsedSizes,
        featured: featured === "true",
        images: imageUrls,
        createdBy: req.user._id
    });
    
    console.log(product);
    return res.status(201).json(
        new ApiResponse(
            201,
            product,
            "Product created successfully"
        )
    );
});

const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find()
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully"
        )
    );
});

const getProductById = asyncHandler(async (req, res) => {
    console.log("Get Product Route Hit");
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            product,
            "Product fetched successfully"
        )
    );
});

const getProductsByCategory = asyncHandler(async (req, res) => {

    const { category } = req.params;

    const products = await Product.find({ category });
    console.log(category);
    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully"
        )
    );
});

const getFeaturedProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({
        featured: true
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Featured products fetched successfully"
        )
    );
});

const updateProduct = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: req.body
        },
        {
            returnDocument: "after"
        }
    );
    console.log(req.body);
    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProduct,
            "Product updated successfully"
        )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Product deleted successfully"
        )
    );
});


export {
    addProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    updateProduct,
    deleteProduct
}