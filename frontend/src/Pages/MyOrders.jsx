// import React from 'react';
// import { FaBoxOpen } from 'react-icons/fa';

// const dummyOrders = [
//     {
//         id: "DBH982341",
//         date: "26 June 2026",
//         status: "Delivered",
//         total: 5298,
//         items: 2,
//     },
//     {
//         id: "DBH982342",
//         date: "22 June 2026",
//         status: "Shipped",
//         total: 2499,
//         items: 1,
//     },
//     {
//         id: "DBH982343",
//         date: "20 June 2026",
//         status: "Processing",
//         total: 3199,
//         items: 1,
//     }
// ];

// const MyOrders = () => {

//     return (
//         <div className='min-h-screen bg-[#F8F6F2] px-6 py-12'>

//             {/* Heading */}
//             <div className='text-center mb-14'>
//                 <p className='uppercase tracking-[5px] text-[#C9A227] text-sm'>
//                     Your Purchases
//                 </p>

//                 <h1 className='text-5xl font-serif text-[#111111] mt-2'>
//                     My Orders
//                 </h1>

//                 <div className='w-28 h-[3px] bg-[#C9A227] mx-auto mt-5 rounded-full'></div>
//             </div>

//             <div className='max-w-[1100px] mx-auto space-y-8'>

//                 {
//                     dummyOrders.map((order) => (

//                         <div
//                             key={order.id}
//                             className='bg-white rounded-3xl shadow-md p-8'
//                         >

//                             <div className='flex flex-col md:flex-row justify-between gap-8'>

//                                 {/* Left */}
//                                 <div className='flex gap-6'>

//                                     <div className='w-16 h-16 rounded-full bg-[#FFF7DD] flex items-center justify-center'>
//                                         <FaBoxOpen className='text-[#C9A227] text-3xl' />
//                                     </div>

//                                     <div>

//                                         <h3 className='font-semibold text-xl'>
//                                             Order #{order.id}
//                                         </h3>

//                                         <p className='text-gray-500 mt-2'>
//                                             Placed on {order.date}
//                                         </p>

//                                         <p className='text-gray-500'>
//                                             {order.items} Item(s)
//                                         </p>

//                                     </div>

//                                 </div>

//                                 {/* Middle */}
//                                 <div className='flex flex-col justify-center'>

//                                     <p className='text-gray-500'>
//                                         Total Amount
//                                     </p>

//                                     <p className='text-3xl font-bold text-[#C9A227]'>
//                                         ₹{order.total}
//                                     </p>

//                                 </div>

//                                 {/* Right */}
//                                 <div className='flex flex-col justify-center items-start md:items-end gap-4'>

//                                     <span className={`
//                                         px-5 py-2 rounded-full text-sm font-semibold
//                                         ${order.status === "Delivered"
//                                             ? "bg-green-100 text-green-700"
//                                             : order.status === "Shipped"
//                                             ? "bg-blue-100 text-blue-700"
//                                             : "bg-yellow-100 text-yellow-700"
//                                         }
//                                     `}>
//                                         {order.status}
//                                     </span>

//                                     <button className='border border-[#C9A227] text-[#C9A227] px-6 py-3 rounded-full hover:bg-[#C9A227] hover:text-white transition-all'>
//                                         Track Order
//                                     </button>

//                                 </div>

//                             </div>

//                         </div>

//                     ))
//                 }

//             </div>

//         </div>
//     );
// };

// export default MyOrders;



import React, { useEffect, useState } from 'react';
import { FaBoxOpen } from 'react-icons/fa';
import API from '../services/api';
import { toast } from 'react-toastify';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const res = await API.get(
                "/orders/my-orders",
                {
                    withCredentials: true
                }
            );

            setOrders(res.data.data);

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to fetch orders"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className='min-h-screen bg-[#F8F6F2] flex justify-center items-center'>
                <h1 className='text-3xl font-serif'>
                    Loading Orders...
                </h1>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#F8F6F2] px-6 py-12'>

            {/* Heading */}
            <div className='text-center mb-14'>
                <p className='uppercase tracking-[5px] text-[#C9A227] text-sm'>
                    Your Purchases
                </p>

                <h1 className='text-5xl font-serif text-[#111111] mt-2'>
                    My Orders
                </h1>

                <div className='w-28 h-[3px] bg-[#C9A227] mx-auto mt-5 rounded-full'></div>
            </div>

            {
                orders.length === 0 ? (

                    <div className='flex flex-col items-center justify-center mt-24'>

                        <h2 className='text-3xl font-serif text-[#111111] mb-4'>
                            No Orders Yet
                        </h2>

                        <p className='text-gray-500 text-lg'>
                            Start shopping to place your first order.
                        </p>

                    </div>

                ) : (

                    <div className='max-w-[1100px] mx-auto space-y-8'>

                        {
                            orders.map((order) => (

                                <div
                                    key={order._id}
                                    className='bg-white rounded-3xl shadow-md p-8'
                                >

                                    <div className='flex flex-col md:flex-row justify-between gap-8'>

                                        {/* Left */}
                                        <div className='flex gap-6'>

                                            <div className='w-16 h-16 rounded-full bg-[#FFF7DD] flex items-center justify-center'>
                                                <FaBoxOpen className='text-[#C9A227] text-3xl' />
                                            </div>

                                            <div>

                                                <h3 className='font-semibold text-xl'>
                                                    Order #{order._id.slice(-6)}
                                                </h3>

                                                <p className='text-gray-500 mt-2'>
                                                    Placed on{" "}
                                                    {
                                                        new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString()
                                                    }
                                                </p>

                                                <p className='text-gray-500'>
                                                    {order.orderItems.length} Item(s)
                                                </p>

                                                {/* Products */}
                                                <div className='mt-4 space-y-3'>

                                                    {
                                                        order.orderItems.map((item, index) => (

                                                            item.product ? (

                                                                <div
                                                                    key={index}
                                                                    className="flex gap-4 items-center"
                                                                >

                                                                    <img
                                                                        src={item.product.images[0]}
                                                                        alt={item.product.name}
                                                                        className="w-16 h-16 object-cover rounded-xl"
                                                                    />

                                                                    <div>

                                                                        <h4 className="font-semibold">
                                                                            {item.product.name}
                                                                        </h4>

                                                                        <p className="text-gray-500">
                                                                            Qty: {item.quantity}
                                                                        </p>

                                                                        <p className="text-[#C9A227]">
                                                                            ₹{item.price}
                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            ) : (

                                                                <div
                                                                    key={index}
                                                                    className="text-red-500"
                                                                >
                                                                    Product no longer exists
                                                                </div>

                                                            )

                                                        ))
                                                    }

                                                </div>

                                            </div>

                                        </div>

                                        {/* Middle */}
                                        <div className='flex flex-col justify-center'>

                                            <p className='text-gray-500'>
                                                Total Amount
                                            </p>

                                            <p className='text-3xl font-bold text-[#C9A227]'>
                                                ₹{order.totalAmount}
                                            </p>

                                        </div>

                                        {/* Right */}
                                        <div className='flex flex-col justify-center items-start md:items-end gap-4'>

                                            <span className={`
                                                px-5 py-2 rounded-full text-sm font-semibold
                                                ${
                                                    order.orderStatus === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.orderStatus === "Shipped"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order.orderStatus === "Cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }
                                            `}>
                                                {order.orderStatus}
                                            </span>

                                            <button className='border border-[#C9A227] text-[#C9A227] px-6 py-3 rounded-full hover:bg-[#C9A227] hover:text-white transition-all'>
                                                Track Order
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
};

export default MyOrders;