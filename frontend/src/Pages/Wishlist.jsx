// import React, { useContext } from 'react';
// import { ShopContext } from '../Context/ShpContext';
// import Item from '../Components/Items/Item';

// const Wishlist = () => {

//     const { wishlistItems } = useContext(ShopContext);

//     return (
//         <div className='bg-[#F8F6F2] min-h-screen px-8 py-12'>

//             {/* Heading */}
//             <div className='text-center mb-14'>
//                 <p className='uppercase tracking-[5px] text-[#C9A227] text-sm'>
//                     Your Favorites
//                 </p>

//                 <h1 className='text-5xl font-serif text-[#111111] mt-2'>
//                     Wishlist
//                 </h1>

//                 <div className='w-24 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full'></div>
//             </div>

//             {/* Empty Wishlist */}
//             {wishlistItems.length === 0 ? (

//                 <div className='flex flex-col items-center justify-center mt-24'>

//                     <h2 className='text-3xl font-serif text-[#111111] mb-4'>
//                         Your Wishlist is Empty
//                     </h2>

//                     <p className='text-gray-500 text-lg'>
//                         Save your favorite products here ❤️
//                     </p>

//                 </div>

//             ) : (

//                 <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'>

//                     {wishlistItems.map((item) => (

//                         <Item
//                             key={item.product._id}
//                             id={item.product._id}
//                             image={item.product.images[0]}
//                             name={item.product.name}
//                             new_price={item.product.price}
//                             old_price={item.product.originalPrice}
//                             rating={item.product.averageRating}
//                         />

//                     ))}

//                 </div>

//             )}

//         </div>
//     );
// };

// export default Wishlist;

import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShpContext';
import Item from '../Components/Items/Item';

const Wishlist = () => {

    const { wishlistItems } = useContext(ShopContext);
    //console.log(wishlistItems);
    return (
        <div className='bg-[#F8F6F2] min-h-screen px-8 py-12'>

            {/* Heading */}
            <div className='text-center mb-14'>
                <p className='uppercase tracking-[5px] text-[#C9A227] text-sm'>
                    Your Favorites
                </p>

                <h1 className='text-5xl font-serif text-[#111111] mt-2'>
                    Wishlist
                </h1>

                <div className='w-24 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full'></div>
            </div>

            {/* Empty Wishlist */}
            {wishlistItems.length === 0 ? (

                <div className='flex flex-col items-center justify-center mt-24'>

                    <h2 className='text-3xl font-serif text-[#111111] mb-4'>
                        Your Wishlist is Empty
                    </h2>

                    <p className='text-gray-500 text-lg'>
                        Save your favorite products here ❤️
                    </p>

                </div>

            ) : (

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'>

                    {wishlistItems.map((item) => (

                        <Item
                            key={item._id}
                            id={item._id}
                            image={item.images[0]}
                            name={item.name}
                            new_price={item.price}
                            old_price={item.originalPrice}
                            rating={item.averageRating}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};

export default Wishlist;
