import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const res = await API.get(
                "/orders",
                {
                    withCredentials: true
                }
            );

            setOrders(res.data.data);

        } catch (error) {

            console.log(error);
            toast.error("Failed to fetch orders");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, orderStatus) => {

        try {

            await API.patch(
                `/orders/${orderId}`,
                { orderStatus },
                {
                    withCredentials: true
                }
            );

            toast.success("Order status updated");

            fetchOrders();

        } catch (error) {

            console.log(error);
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-8">
                Orders
            </h1>

            <div className="space-y-8">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="border rounded-xl p-6"
                    >

                        {/* Top */}
                        <div className="flex justify-between items-center mb-6">

                            <div>

                                <h2 className="font-bold text-xl">
                                    Order #{order._id.slice(-6)}
                                </h2>

                                <p className="text-gray-500">
                                    Customer:
                                    {" "}
                                    {order.user?.fullname}
                                </p>

                                <p className="text-gray-500">
                                    Email:
                                    {" "}
                                    {order.user?.email}
                                </p>

                            </div>

                            <div>

                                <p className="font-bold text-2xl text-[#C9A227]">
                                    ₹{order.totalAmount}
                                </p>

                            </div>

                        </div>

                        {/* Products */}
                        <div className="mb-6">

                            <h3 className="font-semibold mb-4">
                                Ordered Products
                            </h3>

                            <div className="space-y-4">

                               {
                                    order.orderItems.map((item) => {

                                        if (!item.product) {
                                            return (
                                                <div
                                                    key={item._id}
                                                    className="border p-3 rounded-lg text-red-500"
                                                >
                                                    Product no longer exists
                                                </div>
                                            );
                                        }

                                        return (
                                            <div
                                                key={item._id}
                                                className="flex gap-4 items-center border p-3 rounded-lg"
                                            >

                                                <img
                                                    src={item.product.images?.[0]}
                                                    alt={item.product.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />

                                                <div>

                                                    <h4 className="font-semibold">
                                                        {item.product.name}
                                                    </h4>

                                                    <p>
                                                        Qty: {item.quantity}
                                                    </p>

                                                    <p>
                                                        ₹{item.price}
                                                    </p>

                                                </div>

                                            </div>
                                        );
                                    })
                                }

                            </div>

                        </div>

                        {/* Shipping */}
                        <div className="mb-6">

                            <h3 className="font-semibold mb-2">
                                Shipping Address
                            </h3>

                            <p>
                                {order.shippingAddress.fullName}
                            </p>

                            <p>
                                {order.shippingAddress.phone}
                            </p>

                            <p>
                                {order.shippingAddress.address}
                            </p>

                            <p>
                                {order.shippingAddress.city},
                                {" "}
                                {order.shippingAddress.state}
                                {" - "}
                                {order.shippingAddress.pincode}
                            </p>

                        </div>

                        {/* Bottom */}
                        <div className="flex justify-between items-center">

                            <div>

                                <p>
                                    Payment:
                                    {" "}
                                    {order.paymentMethod}
                                </p>

                                <p>
                                    Status:
                                    {" "}
                                    <span className="font-semibold">
                                        {order.orderStatus}
                                    </span>
                                </p>

                            </div>

                            <select
                                value={order.orderStatus}
                                onChange={(e) =>
                                    updateStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                                className="border p-3 rounded-lg"
                            >

                                <option value="Processing">
                                    Processing
                                </option>

                                <option value="Confirmed">
                                    Confirmed
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Orders;