import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {

            const res = await API.get("/products");

            setProducts(res.data.data);

        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/products/${productId}`,
                {
                    withCredentials: true
                }
            );

            toast.success("Product deleted successfully");

            fetchProducts();

        } catch (error) {
            console.log(error);
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <Link to="/admin/add-product">
                    <button className="bg-[#C9A227] text-white px-5 py-3 rounded-lg">
                        Add Product
                    </button>
                </Link>

            </div>

            {
                loading ? (
                    <p>Loading...</p>
                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b text-left">

                                    <th className="pb-4">Image</th>
                                    <th className="pb-4">Name</th>
                                    <th className="pb-4">Category</th>
                                    <th className="pb-4">Price</th>
                                    <th className="pb-4">Stock</th>
                                    <th className="pb-4">Featured</th>
                                    <th className="pb-4">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    products.map((product) => (

                                        <tr
                                            key={product._id}
                                            className="border-b"
                                        >

                                            {/* Image */}
                                            <td className="py-4">

                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />

                                            </td>

                                            {/* Name */}
                                            <td className="py-4">
                                                {product.name}
                                            </td>

                                            {/* Category */}
                                            <td className="py-4 capitalize">
                                                {product.category}
                                            </td>

                                            {/* Price */}
                                            <td className="py-4">
                                                ₹{product.price}
                                            </td>

                                            {/* Stock */}
                                            <td className="py-4">
                                                {product.stock}
                                            </td>

                                            {/* Featured */}
                                            <td className="py-4">
                                                {
                                                    product.featured
                                                        ? "Yes"
                                                        : "No"
                                                }
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 flex items-center h-full gap-4">

                                              <Link to={`/admin/edit-product/${product._id}`}>
                                                  <button className="text-blue-500 hover:text-blue-700">
                                                      <FaEdit />
                                                  </button>
                                              </Link>

                                              <button
                                                  onClick={() => handleDelete(product._id)}
                                                  className="text-red-500 hover:text-red-700"
                                              >
                                                  <FaTrash />
                                              </button>

                                          </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                )
            }

        </div>
    );
};

export default Products;