import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrum = ({ product }) => {
    return (
        <div className='flex items-center flex-wrap gap-2 text-sm md:text-base font-medium text-[#5B5B5B] py-6 px-8 bg-[#F8F6F2]'>

            <Link
                to='/'
                className='hover:text-[#C9A227] transition-all duration-300'
            >
                HOME
            </Link>

            <MdKeyboardArrowRight className='text-[#C9A227] text-xl' />

            <Link
                to='/'
                className='hover:text-[#C9A227] transition-all duration-300'
            >
                SHOP
            </Link>

            <MdKeyboardArrowRight className='text-[#C9A227] text-xl' />

            <Link
                to={`/${product.category}`}
                className='capitalize hover:text-[#C9A227] transition-all duration-300'
            >
                {product.category}
            </Link>

            <MdKeyboardArrowRight className='text-[#C9A227] text-xl' />

            <span className='text-[#111111] font-semibold'>
                {product.name}
            </span>

        </div>
    );
};

export default Breadcrum;
