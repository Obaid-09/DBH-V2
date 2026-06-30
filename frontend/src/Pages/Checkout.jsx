import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShpContext';
import { FaTruck, FaGooglePay, FaCreditCard } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import API from "../services/api";
import { toast } from "react-toastify";

const Checkout = () => {

    const {
        getTotalCartAmount,
        fetchCart
    } = useContext(ShopContext);

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    
    const applyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error("Enter coupon code");
            return;
        }
        try {
            const res = await API.post(
                "/coupons/apply",
                {
                    code: couponCode
                },
                {
                    withCredentials: true
                }
            );
            const coupon = res.data.data;
            setAppliedCoupon(coupon);
            setDiscount(coupon.discount);
            toast.success(
                `${coupon.discount}% discount applied`
            );
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Invalid Coupon"
            );
        }
    };
        const subtotal = getTotalCartAmount();
        const discountAmount =
            subtotal * (discount / 100);
        const finalAmount =
            (subtotal - discountAmount).toFixed(2);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post(
                "/orders",
                {
                    shippingAddress,
                    paymentMethod: paymentMethod.toUpperCase(),
                    discount
                },
                {
                    withCredentials: true
                }
            );
            await fetchCart();
            toast.success("Order Placed Successfully 🎉");
            navigate("/order-success");
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to place order"
            );
        }
    };

    const handleChange = (e) => {

        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };
    


    return (
        <div className='bg-[#F8F6F2] min-h-screen px-6 md:px-12 py-12'>

            {/* Heading */}
            <div className='text-center mb-14'>
                <p className='uppercase tracking-[5px] text-[#C9A227] text-sm'>
                    Secure Checkout
                </p>

                <h1 className='text-5xl font-serif text-[#111111] mt-2'>
                    Checkout
                </h1>

                <div className='w-28 h-[3px] bg-[#C9A227] rounded-full mx-auto mt-5'></div>
            </div>

            <form
                onSubmit={handleSubmit}
                className='max-w-[1400px] mx-auto grid lg:grid-cols-[2fr_1fr] gap-10'
            >

                {/* LEFT SIDE */}
                <div className='bg-white rounded-3xl shadow-md p-8'>

                    <h2 className='text-3xl font-serif mb-8 text-[#111111]'>
                        Billing Details
                    </h2>

                    {/* Full Name */}
                    <div className='mb-5'>
                        <label className='block mb-2 font-medium'>
                            Full Name <span className='text-red-500'>*</span>
                        </label>

                        <input
                            type='text'
                            required
                            name="fullName"
                            value={shippingAddress.fullName}
                            onChange={handleChange}
                            placeholder='Enter Full Name'
                        />
                    </div>

                    {/* Email + Phone */}
                    <div className='grid md:grid-cols-2 gap-5 mb-5'>

                        <div>
                            <label className='block mb-2 font-medium'>
                                Email Address <span className='text-red-500'>*</span>
                            </label>

                            <input
                                type='email'
                                required
                                placeholder='Enter Email'
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                            />
                        </div>

                        <div>
                            <label className='block mb-2 font-medium'>
                                Phone Number <span className='text-red-500'>*</span>
                            </label>

                            <input
                                type='tel'
                                required
                                name="phone"
                                value={shippingAddress.phone}
                                onChange={handleChange}
                                placeholder='Enter Phone Number'
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                            />
                        </div>

                    </div>

                    {/* Address Line 1 */}
                    <div className='mb-5'>
                        <label className='block mb-2 font-medium'>
                            Address Line 1 <span className='text-red-500'>*</span>
                        </label>

                        <input
                            type='text'
                            required
                            name="address"
                            value={shippingAddress.address}
                            onChange={handleChange}
                            placeholder='House No, Street Name'
                            className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                        />
                    </div>

                    {/* Address Line 2 */}
                    {/* <div className='mb-5'>
                        <label className='block mb-2 font-medium'>
                            Address Line 2
                        </label>

                        <input
                            type='text'
                            placeholder='Apartment, Landmark (Optional)'
                            className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                        />
                    </div> */}

                    {/* City + State */}
                    <div className='grid md:grid-cols-2 gap-5 mb-5'>

                        <div>
                            <label className='block mb-2 font-medium'>
                                City <span className='text-red-500'>*</span>
                            </label>

                            <input
                                type='text'
                                required
                                name="city"
                                value={shippingAddress.city}
                                onChange={handleChange}
                                placeholder='Enter City'
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                            />
                        </div>

                        <div>
                            <label className='block mb-2 font-medium'>
                                State <span className='text-red-500'>*</span>
                            </label>

                            <input
                                type='text'
                                required
                                name="state"
                                value={shippingAddress.state}
                                onChange={handleChange}
                                placeholder='Enter State'
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                            />
                        </div>

                    </div>

                    {/* Country + Pincode */}
                    <div className='grid md:grid-cols-2 gap-5 mb-10'>

                        {/* <div>
                            <label className='block mb-2 font-medium'>
                                Country <span className='text-red-500'>*</span>
                            </label>

                            <input
                                type='text'
                                required
                                placeholder='Enter Country'
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                            />
                        </div> */}

                        <div>
                            <label className='block mb-2 font-medium'>
                                Pincode <span className='text-red-500'>*</span>
                            </label>

                            <input
                                type='number'
                                required
                                name="pincode"
                                value={shippingAddress.pincode}
                                onChange={handleChange}
                                placeholder='Enter Pincode'
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227]'
                            />
                        </div>

                    </div>

                    {/* Payment Method */}
                    <h2 className='text-3xl font-serif mb-8 text-[#111111]'>
                        Payment Method
                    </h2>

                    <div className='space-y-4'>

                        <label className='flex items-center gap-4 p-5 border rounded-2xl cursor-pointer hover:border-[#C9A227]'>
                            <input
                                type='radio'
                                checked={paymentMethod === "COD"}
                                onChange={() => setPaymentMethod("COD")}
                            />
                                    <FaTruck className='text-2xl text-[#C9A227]' />

                                    <span className='font-medium text-lg'>
                                        Cash On Delivery
                                    </span>

                        </label>

                        <label className='flex items-center gap-4 p-5 border rounded-2xl cursor-pointer hover:border-[#C9A227]'>
                            <input
                                type='radio'
                                checked={paymentMethod === "UPI"}
                                onChange={() => setPaymentMethod("UPI")}
                            />
                            <FaGooglePay className='text-2xl text-[#C9A227]' />

                            <span className='font-medium text-lg'>
                                UPI Payment
                            </span>
                        </label>

                        <label className='flex items-center gap-4 p-5 border rounded-2xl cursor-pointer hover:border-[#C9A227]'>
                            <input
                                type='radio'
                                checked={paymentMethod === "RAZORPAY"}
                                onChange={() => setPaymentMethod("RAZORPAY")}
                            />
                            <FaCreditCard className='text-2xl text-[#C9A227]' />

                            <span className='font-medium text-lg'>
                                Razorpay
                            </span>
                        </label>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className='bg-white rounded-3xl shadow-md p-8 h-fit sticky top-10'>

                    <h2 className='text-3xl font-serif mb-8 text-[#111111]'>
                        Order Summary
                    </h2>

                    <div className='space-y-5'>

                        <div className='flex justify-between border-b pb-4'>
                            <p>Subtotal</p>
                            {/* <p>₹{getTotalCartAmount()}</p> */}
                            <p>₹{subtotal}</p>
                        </div>

                        <div className='flex justify-between border-b pb-4'>
                            <p>Shipping</p>
                            <p className='text-green-600'>FREE</p>
                        </div>
                        
                        <div className='flex justify-between border-b pb-4'>
                            <p>Discount</p>

                            <p className='text-green-600'>
                                - ₹{discountAmount.toFixed(2)}
                            </p>
                        </div>

                        <div className='mt-8'>
                            <h3 className='font-semibold mb-4'>
                                Apply Coupon
                            </h3>

                            <div className='flex gap-3'>
                                <input
                                    type='text'
                                    placeholder='Coupon Code'
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                    className='flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none'
                                />
                                <button
                                    type='button'
                                    onClick={applyCoupon}
                                    className='bg-[#111111] text-white px-5 rounded-xl'
                                >
                                    Apply
                                </button>
                            </div>
                            {
                                appliedCoupon && (
                                    <p className='text-green-600 mt-3'>
                                        Coupon {appliedCoupon.code}
                                        applied successfully!
                                    </p>
                                )
                            }
                        </div>

                        <div className='flex justify-between text-2xl font-bold'>
                            <p>Total</p>

                            <p className='text-[#C9A227]'>
                                ₹{finalAmount.toFixed(2)}
                            </p>
                        </div>

                    </div>

                    <button
                        type='submit'
                        className='w-full mt-10 py-4 bg-[#C9A227] text-white rounded-full text-lg font-semibold hover:bg-[#b08d1f] transition-all duration-300'
                    >
                        Place Order
                    </button>

                    <p className='text-center text-sm text-gray-500 mt-6'>
                        🔒 Your payment information is secure and encrypted.
                    </p>

                </div>

            </form>

        </div>
    );
};

export default Checkout;