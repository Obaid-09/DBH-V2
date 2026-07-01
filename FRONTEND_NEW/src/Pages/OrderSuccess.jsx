import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {

    // Temporary order id
    const orderId = `DBH${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <div className='min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6 py-10'>

            <div className='bg-white max-w-[700px] w-full rounded-[40px] shadow-lg p-8 md:p-14 text-center'>

                {/* Success Icon */}
                <FaCheckCircle className='text-[#C9A227] text-8xl mx-auto mb-6' />

                {/* Heading */}
                <p className='uppercase tracking-[5px] text-[#C9A227] text-sm mb-2'>
                    Thank You For Shopping
                </p>

                <h1 className='text-4xl md:text-5xl font-serif text-[#111111] mb-5'>
                    Order Confirmed
                </h1>

                <p className='text-gray-600 text-lg leading-8'>
                    Your order has been placed successfully.
                    We are preparing your premium collection and
                    will notify you once it has been shipped.
                </p>

                {/* Order Info */}
                <div className='bg-[#F8F6F2] rounded-3xl p-8 mt-10 text-left space-y-5'>

                    <div className='flex justify-between border-b pb-4'>
                        <span className='text-gray-500'>
                            Order Number
                        </span>

                        <span className='font-semibold'>
                            #{orderId}
                        </span>
                    </div>

                    <div className='flex justify-between border-b pb-4'>
                        <span className='text-gray-500'>
                            Estimated Delivery
                        </span>

                        <span className='font-semibold'>
                            5 - 7 Business Days
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <span className='text-gray-500'>
                            Payment Status
                        </span>

                        <span className='text-green-600 font-semibold'>
                            Confirmed
                        </span>
                    </div>

                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center mt-10'>

                    <Link to='/'>
                        <button className='px-10 py-4 bg-[#C9A227] text-white rounded-full font-semibold hover:bg-[#b08d1f] transition-all duration-300'>
                            Continue Shopping
                        </button>
                    </Link>

                    <button className='px-10 py-4 border border-[#C9A227] text-[#C9A227] rounded-full font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300'>
                        <Link to = '/orders'>View Orders</Link>
                    </button>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;