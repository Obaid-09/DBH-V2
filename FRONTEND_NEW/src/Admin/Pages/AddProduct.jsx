import React, { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        originalPrice: "",
        stock: "",
        sizes: [],
        featured: false
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setProductData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    const handleSizeChange = (size) => {

        if (productData.sizes.includes(size)) {

            setProductData((prev) => ({
                ...prev,
                sizes: prev.sizes.filter((s) => s !== size)
            }));

        } else {

            setProductData((prev) => ({
                ...prev,
                sizes: [...prev.sizes, size]
            }));
        }
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", productData.name);
            formData.append("description", productData.description);
            formData.append("category", productData.category);
            formData.append("price", productData.price);
            formData.append(
                "originalPrice",
                productData.originalPrice
            );
            formData.append("stock", productData.stock);

            formData.append(
                "sizes",
                JSON.stringify(productData.sizes)
            );

            formData.append(
                "featured",
                productData.featured
            );

            images.forEach((image) => {
                formData.append("images", image);
            });

            await API.post(
                "/products",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    },
                    withCredentials: true
                }
            );

            toast.success("Product Added Successfully");

            navigate("/admin/products");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-8">
                Add Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="5"
                    value={productData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <div className="grid grid-cols-3 gap-5">

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={productData.price}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="originalPrice"
                        placeholder="Original Price"
                        value={productData.originalPrice}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={productData.stock}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                </div>

                <div>

                    <h3 className="font-semibold mb-3">
                        Sizes
                    </h3>

                    <div className="flex gap-3">

                        {["S", "M", "L", "XL"].map((size) => (

                            <button
                                key={size}
                                type="button"
                                onClick={() =>
                                    handleSizeChange(size)
                                }
                                className={`px-5 py-2 rounded-lg border
                                ${
                                    productData.sizes.includes(size)
                                    ? "bg-[#C9A227] text-white"
                                    : ""
                                }`}
                            >
                                {size}
                            </button>

                        ))}

                    </div>

                </div>

                <div>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                </div>

                <div className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="featured"
                        checked={productData.featured}
                        onChange={handleChange}
                    />

                    <label>
                        Featured Product
                    </label>

                </div>

                <button
                    type="submit"
                    className="bg-[#C9A227] text-white px-8 py-3 rounded-lg"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
};

export default AddProduct;