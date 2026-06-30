import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await API.get(
                    `/products/${productId}`
                );

                const product = res.data.data;

                setProductData({
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    stock: product.stock,
                    sizes: product.sizes || [],
                    featured: product.featured
                });

            } catch (error) {

                console.log(error);
                toast.error("Failed to fetch product");

            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [productId]);

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
                sizes: prev.sizes.filter(
                    (s) => s !== size
                )
            }));

        } else {

            setProductData((prev) => ({
                ...prev,
                sizes: [...prev.sizes, size]
            }));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.patch(
                `/products/${productId}`,
                {
                    ...productData,
                    category:
                        productData.category.toLowerCase()
                },
                {
                    withCredentials: true
                }
            );

            toast.success(
                "Product updated successfully"
            );

            navigate("/admin/products");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update product"
            );
        }
    };

    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="bg-white p-8 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-8">
                Edit Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <textarea
                    rows="5"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <div className="grid grid-cols-3 gap-5">

                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="originalPrice"
                        value={productData.originalPrice}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="stock"
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

                        {
                            ["S", "M", "L", "XL"].map(
                                (size) => (

                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            handleSizeChange(size)
                                        }
                                        className={`
                                            px-5 py-2 rounded-lg border
                                            ${
                                                productData.sizes.includes(size)
                                                ? "bg-[#C9A227] text-white"
                                                : ""
                                            }
                                        `}
                                    >
                                        {size}
                                    </button>
                                )
                            )
                        }

                    </div>

                </div>

                <div className="flex gap-3">

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
                    Update Product
                </button>

            </form>

        </div>
    );
};

export default EditProduct;