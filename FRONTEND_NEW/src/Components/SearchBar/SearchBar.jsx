// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../../Context/ShpContext';
// import { Link } from 'react-router-dom';
// import { FiSearch } from "react-icons/fi";

// const SearchBar = () => {

//     const { all_products } = useContext(ShopContext);

//     const [search, setSearch] = useState("");

//     const filteredProducts = all_products.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className='relative w-full max-w-[400px]'>

//             {/* Search Input */}
//             <div className='flex items-center bg-white border border-gray-300 rounded-full px-5 py-3 shadow-sm focus-within:border-[#C9A227]'>

//                 <FiSearch className='text-gray-500 text-xl mr-3' />

//                 <input
//                     type='text'
//                     placeholder='Search products...'
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className='w-full outline-none bg-transparent'
//                 />

//             </div>

//             {/* Suggestions */}
//             {
//                 search.length > 0 && (

//                     <div className='absolute top-[65px] left-0 w-full bg-white rounded-2xl shadow-xl max-h-[300px] overflow-y-auto z-50'>

//                         {
//                             filteredProducts.length > 0 ? (

//                                 filteredProducts.map((item) => (

//                                     <Link
//                                         key={item.id}
//                                         to={`/product/${item.id}`}
//                                         onClick={() => setSearch("")}
//                                     >
//                                         <div className='flex items-center gap-4 p-3 hover:bg-gray-100 transition-all duration-300'>

//                                             <img
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 className='w-14 h-14 rounded-xl object-cover'
//                                             />

//                                             <div>
//                                                 <h4 className='font-medium text-[#111111]'>
//                                                     {item.name}
//                                                 </h4>

//                                                 <p className='text-[#C9A227] font-semibold'>
//                                                     ₹{item.new_price}
//                                                 </p>
//                                             </div>

//                                         </div>
//                                     </Link>

//                                 ))

//                             ) : (

//                                 <p className='p-4 text-center text-gray-500'>
//                                     No products found
//                                 </p>

//                             )
//                         }

//                     </div>

//                 )
//             }

//         </div>
//     );
// };

// export default SearchBar;



import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShpContext';
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {

    const { all_products = [] } = useContext(ShopContext);

    const [search, setSearch] = useState("");

    const filteredProducts = all_products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='relative w-full max-w-[400px]'>

            {/* Search Input */}
            <div className='flex items-center bg-white border border-gray-300 rounded-full px-5 py-3 shadow-sm focus-within:border-[#C9A227]'>

                <FiSearch className='text-gray-500 text-xl mr-3' />

                <input
                    type='text'
                    placeholder='Search products...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full outline-none bg-transparent'
                />

            </div>

            {/* Suggestions */}
            {
                search.length > 0 && (

                    <div className='absolute top-[65px] left-0 w-full bg-white rounded-2xl shadow-xl max-h-[300px] overflow-y-auto z-50'>

                        {
                            filteredProducts.length > 0 ? (

                                filteredProducts.map((item) => (

                                    <Link
                                        key={item._id || item.id}
                                        to={`/product/${item._id || item.id}`}
                                        onClick={() => setSearch("")}
                                    >
                                        <div className='flex items-center gap-4 p-3 hover:bg-gray-100 transition-all duration-300'>

                                            <img
                                                src={item.images?.[0] || item.image}
                                                alt={item.name}
                                                className='w-14 h-14 rounded-xl object-cover'
                                            />

                                            <div>
                                                <h4 className='font-medium text-[#111111]'>
                                                    {item.name}
                                                </h4>

                                                <p className='text-[#C9A227] font-semibold'>
                                                    ₹{item.price || item.new_price}
                                                </p>
                                            </div>

                                        </div>
                                    </Link>

                                ))

                            ) : (

                                <p className='p-4 text-center text-gray-500'>
                                    No products found
                                </p>

                            )
                        }

                    </div>

                )
            }

        </div>
    );
};

export default SearchBar;