// import React from 'react'
// import data_product from '../Assets/data'
// import Item from '../Items/Item'


// const Popular = () => {
//   return (
//     <div className='mt-6 mb-5'>
//       <div className="text-center mb-12">
//         <p className="uppercase tracking-[6px] text-[#C9A227] text-sm">
//             Curated Collection
//         </p>

//         <h2 className="text-5xl font-serif font-semibold text-[#111111] mt-2">
//             Popular Products
//         </h2>

//         <div className="w-24 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full"></div>
//     </div>

//         <div className="flex flex-wrap justify-center gap-8 mt-10">
//             {data_product.map((item) => (
//                 <Item
//                 key={item.id}
//                 id={item.id}
//                 image={item.image}
//                 name={item.name}
//                 new_price={item.new_price}
//                 old_price={item.old_price}
//                 rating={item.rating}
//                 />
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Popular


import React, { useEffect, useState } from 'react';
import Item from '../Items/Item';
import API from '../../services/api';

const Popular = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const res = await API.get("/products");

            // featured products only
            const featuredProducts =
                res.data.data.filter(
                    product => product.featured === true
                );

            setProducts(featuredProducts);

        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='mt-6 mb-5'>

            <div className="text-center mb-12">

                <p className="uppercase tracking-[6px] text-[#C9A227] text-sm">
                    Curated Collection
                </p>

                <h2 className="text-5xl font-serif font-semibold text-[#111111] mt-2">
                    Popular Products
                </h2>

                <div className="w-24 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full"></div>

            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-10">

                {products.map((item) => (

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

        </div>
    );
};

export default Popular;
