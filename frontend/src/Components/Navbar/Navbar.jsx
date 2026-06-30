import React, { useContext, useState } from 'react';
import logo from "../Assets/logo.jpg";
import SearchBar from '../SearchBar/SearchBar';
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShpContext';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useAuth } from "../../Context/AuthContext";


const Navbar = () => {

    const { cartItems, wishlistItems } = useContext(ShopContext);
    const location = useLocation();
    const { user, logout } = useAuth();
    console.log("Navbar User:", user);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);

    return (
        <>
            <div className='w-full h-[90px] px-5 flex justify-between items-center bg-white shadow-sm relative'>

                {/* Left Section */}
                <div className='flex items-center gap-2'>

                    {/* Mobile Menu Icon */}
                    <div className='min-[420px]:hidden'>
                        {
                            mobileMenu ? (
                                <HiOutlineX
                                    className='text-3xl cursor-pointer'
                                    onClick={() => setMobileMenu(false)}
                                />
                            ) : (
                                <HiOutlineMenu
                                    className='text-3xl cursor-pointer'
                                    onClick={() => setMobileMenu(true)}
                                />
                            )
                        }
                    </div>

                    {/* Logo */}
                    <div className='flex items-center cursor-pointer'>
                        <img
                            src={logo}
                            alt="Dubai Burqa House Logo"
                            className='sm:w-[60px] sm:h-[60px] w-[45px] h-[45px] object-cover'
                        />

                        <p className='sm:w-[90px] w-[70px] sm:text-[12px] text-start lg:text-[16px] text-[10px] uppercase tracking-[3px] text-[#C9A227] font-medium'>
                            Dubai Burqa House
                        </p>
                    </div>

                </div>

                {/* Desktop Nav Links */}
                <ul className='hidden min-[420px]:flex gap-2 sm:gap-5 sm:text-sm text-xs md:text-lg font-semibold'>

                    <li
                        className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
                            location.pathname === "/"
                                ? "text-[#C9A227]"
                                : "text-[#111111] hover:text-[#C9A227]"
                        }`}
                    >
                        <Link to='/'>Shop</Link>

                        {location.pathname === "/" && (
                            <div className='w-[80%] h-[3px] bg-[#C9A227] mt-1 rounded-full'></div>
                        )}
                    </li>

                    <li
                        className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
                            location.pathname === "/abaya"
                                ? "text-[#C9A227]"
                                : "text-[#111111] hover:text-[#C9A227]"
                        }`}
                    >
                        <Link to='/abaya'>Abaya</Link>

                        {location.pathname === "/abaya" && (
                            <div className='w-[80%] h-[3px] bg-[#C9A227] mt-1 rounded-full'></div>
                        )}
                    </li>

                    <li
                        className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
                            location.pathname === "/scarf"
                                ? "text-[#C9A227]"
                                : "text-[#111111] hover:text-[#C9A227]"
                        }`}
                    >
                        <Link to='/scarf'>Scarfs</Link>

                        {location.pathname === "/scarf" && (
                            <div className='w-[80%] h-[3px] bg-[#C9A227] mt-1 rounded-full'></div>
                        )}
                    </li>

                </ul>

                {/* Search */}
                <div className='hidden md:block'>
                    <SearchBar />
                </div>

                {/* Actions */}
                <div className='flex gap-2 md:gap-6 items-center'>

                    {
                        user ? (
                            <div className="flex items-center gap-4">
                                <span className='font-medium'>
                                    {user.fullname}
                                </span>

                                <Link to="/orders">
                                    <button className='border border-[#C9A227]
                                                    text-[#C9A227]
                                                    px-5 py-3
                                                    rounded-full
                                                    hover:bg-[#C9A227]
                                                    hover:text-white
                                                    transition-all duration-300'>
                                        My Orders
                                    </button>
                                </Link>

                                <button
                                    onClick={logout}
                                    className='px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300'
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <Link to='/login'>
                                <button className="px-4 py-2 md:px-7 md:py-2.5 bg-[#C9A227] text-white md:text-[20px] text-[13px] rounded-full font-semibold hover:bg-[#b08d1f] hover:shadow-lg transition-all duration-300 cursor-pointer">
                                    Login
                                </button>
                            </Link>
                        )
                    }

                    {/* Wishlist */}
                    <Link to='/wishlist'>
                        <div className="relative cursor-pointer group">

                            <FaRegHeart className="text-[25px] md:text-[30px] text-[#111111] group-hover:text-[#C9A227] transition-all duration-300" />

                            <span className="absolute -top-2 -right-3 bg-[#C9A227] text-white text-[12px] font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                                {wishlistItems.length}
                            </span>

                        </div>
                    </Link>

                    {/* Cart */}
                    <Link to='/cart'>
                        <div className="relative cursor-pointer group">

                            <FiShoppingCart className="sm:text-[30px] text-[25px] md:text-[38px] text-[#111111] group-hover:text-[#C9A227] transition-all duration-300" />

                            {/* <span className="absolute -top-2 -right-3 bg-[#C9A227] text-white text-[12px] font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                                {
                                    Object.values(cartItems).reduce(
                                        (total, item) => total + item,
                                        0
                                    )
                                }
                            </span> */}
                            <div className="absolute -top-2 -right-2 bg-[#C9A227] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {getTotalCartItems()}
                            </div>

                        </div>
                    </Link>

                </div>

            </div>

            {/* Mobile Dropdown Menu */}
            {
                mobileMenu && (
                    <div className='min-[420px]:hidden bg-white shadow-lg py-6 z-50'>

                        <ul className='flex flex-col items-center gap-6 font-semibold text-[#111111]'>

                            <Link
                                to='/'
                                onClick={() => setMobileMenu(false)}
                            >
                                <li className='hover:text-[#C9A227]'>
                                    Shop
                                </li>
                            </Link>

                            <Link
                                to='/abaya'
                                onClick={() => setMobileMenu(false)}
                            >
                                <li className='hover:text-[#C9A227]'>
                                    Abaya
                                </li>
                            </Link>

                            <Link
                                to='/scarf'
                                onClick={() => setMobileMenu(false)}
                            >
                                <li className='hover:text-[#C9A227]'>
                                    Scarfs
                                </li>
                            </Link>

                        </ul>

                    </div>
                )
            }
        </>
    );
};

export default Navbar;
