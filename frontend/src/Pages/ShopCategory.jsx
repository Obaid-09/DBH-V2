import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShpContext.jsx'
import Item from '../Components/Items/Item';
import { FaChevronDown } from "react-icons/fa";

const ShopCategory = (props) => {

    const { all_products } = useContext(ShopContext);

    const [sortType, setSortType] = useState("default");

    let filteredProducts = all_products.filter(
        (item) => item.category === props.category
    );

    // Sorting Logic
    if (sortType === "low-high") {
        filteredProducts.sort((a, b) => a.new_price - b.new_price);
    }
    else if (sortType === "high-low") {
        filteredProducts.sort((a, b) => b.new_price - a.new_price);
    }

    return (
        <div className='bg-[#F8F6F2] min-h-screen px-8 py-10'>

            {/* Heading */}
            <div className='text-center mb-12'>
                <p className='uppercase tracking-[4px] text-[#C9A227] text-sm'>
                    Curated Collection
                </p>

                <h1 className='text-5xl font-serif text-[#111111] capitalize mt-2'>
                    {props.category}
                </h1>

                <div className='w-24 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full'></div>
            </div>

            {/* Top Bar */}
            <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-5'>

                {/* Product Count */}
                <p className='text-gray-600'>
                    Showing <span className='font-semibold text-black'>1-{filteredProducts.length}</span> out of{" "}
                    <span className='font-semibold text-black'>
                        {filteredProducts.length}
                    </span>{" "}
                    products
                </p>

                {/* Sort Dropdown */}
                <div className='relative'>
                    <select
                        className='appearance-none border border-[#C9A227] rounded-full px-5 py-3 pr-10 bg-white text-gray-700 outline-none cursor-pointer'
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="default">Sort by</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>

                    <FaChevronDown className='absolute top-1/2 right-4 -translate-y-1/2 text-[#C9A227] pointer-events-none' />
                </div>

            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {
                    filteredProducts.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            new_price={item.new_price}
                            old_price={item.old_price}
                            rating={item.rating}
                        />
                    ))
                }
            </div>

        </div>
    );
};

export default ShopCategory;