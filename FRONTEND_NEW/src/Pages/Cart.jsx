import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShpContext';
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {

    const {
        cartItems,
        removeFromCart,
        getTotalCartAmount
    } = useContext(ShopContext);

    return (
        <div className='bg-[#F8F6F2] min-h-screen px-8 py-12'>

            {/* Heading */}
            <div className='text-center mb-14'>
                <p className='uppercase tracking-[5px] text-[#C9A227] text-sm'>
                    Shopping Cart
                </p>

                <h1 className='text-5xl font-serif text-[#111111] mt-2'>
                    Your Cart
                </h1>

                <div className='w-28 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full'></div>
            </div>

            {
                cartItems.length === 0 ? (
                    <div className='text-center py-20'>
                        <h2 className='text-3xl font-semibold'>
                            Your Cart is Empty
                        </h2>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className='hidden md:grid grid-cols-[1.2fr_2fr_1fr_1fr_1fr_0.5fr] items-center text-[#111111] font-semibold border-b pb-5 mb-6'>
                            <p>Product</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>

                        {/* Cart Items */}
                        {
                            cartItems.map((item) => (

                                <div
                                    key={item.product._id}
                                    className='grid grid-cols-1 md:grid-cols-[1.2fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-5 bg-white rounded-3xl shadow-sm p-5 mb-6'
                                >

                                    {/* Image */}
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        className='w-[130px] h-[150px] object-cover rounded-2xl mx-auto'
                                    />

                                    {/* Name */}
                                    <div>
                                        <h3 className='text-[#111111] font-medium text-lg'>
                                            {item.product.name}
                                        </h3>

                                        <p className='text-gray-500 text-lg mt-1'>
                                            Size: {item.size}
                                        </p>
                                    </div>
                                    {/* Price */}
                                    <p className='text-[#C9A227] font-semibold text-xl'>
                                        ₹{item.product.price}
                                    </p>

                                    {/* Quantity */}
                                    <button className='w-14 h-14 border border-[#C9A227] rounded-xl font-semibold mx-auto'>
                                        {item.quantity}
                                    </button>

                                    {/* Total */}
                                    <p className='font-semibold text-[#111111] text-lg'>
                                        ₹{item.product.price * item.quantity}
                                    </p>

                                    {/* Remove */}
                                    <button
                                        onClick={() =>
                                            removeFromCart(item.product._id)
                                        }
                                        className='mx-auto text-3xl text-gray-500 hover:text-red-500 transition-all duration-300'
                                    >
                                        <MdDeleteOutline />
                                    </button>

                                </div>

                            ))
                        }

                        {/* Bottom Section */}
                        <div className='grid lg:grid-cols-2 gap-10 mt-16'>

                            {/* Totals */}
                            <div className='bg-white rounded-3xl shadow-md p-8'>

                                <h2 className='text-3xl font-serif mb-8'>
                                    Cart Totals
                                </h2>

                                <div className='space-y-5'>

                                    <div className='flex justify-between border-b pb-4'>
                                        <p>Subtotal</p>
                                        <p>₹{getTotalCartAmount()}</p>
                                    </div>

                                    <div className='flex justify-between border-b pb-4'>
                                        <p>Shipping Fee</p>
                                        <p>Free</p>
                                    </div>

                                    <div className='flex justify-between text-xl font-bold'>
                                        <p>Total</p>

                                        <p className='text-[#C9A227]'>
                                            ₹{getTotalCartAmount()}
                                        </p>
                                    </div>

                                </div>

                                <Link to='/checkout'>
                                    <button className='w-full mt-8 py-4 bg-[#C9A227] text-white rounded-full font-semibold hover:bg-[#b08d1f] transition-all duration-300'>
                                        Proceed To Checkout
                                    </button>
                                </Link>

                            </div>

                            {/* Promo */}
                            <div className='bg-white rounded-3xl shadow-md p-8'>

                                <h2 className='text-3xl font-serif mb-6'>
                                    Promo Code
                                </h2>

                                <p className='text-gray-500 mb-6'>
                                    Have a promo code? Enter it below.
                                </p>

                                <div className='flex flex-col sm:flex-row gap-4'>

                                    <input
                                        type='text'
                                        placeholder='Enter Promo Code'
                                        className='flex-1 border border-gray-300 rounded-full px-6 py-4 outline-none'
                                    />

                                    <button className='px-8 py-4 bg-[#111111] text-white rounded-full'>
                                        Apply
                                    </button>

                                </div>

                            </div>

                        </div>
                    </>
                )
            }

        </div>
    );
};

export default Cart;