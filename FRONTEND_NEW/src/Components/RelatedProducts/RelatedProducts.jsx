import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShpContext';
import Item from '../Items/Item';

const RelatedProducts = ({ category, currentProductId }) => {

    const { all_products } = useContext(ShopContext);

    // Get products from same category except current product
    const relatedProducts = all_products
        .filter(
            (item) =>
                item.category === category &&
                item.id !== currentProductId
        )
        .slice(0, 4); // Show only 4 products

    return (
        <div className='mt-24 px-8'>

            {/* Heading */}
            <div className='text-center mb-12'>
                <p className='uppercase tracking-[4px] text-[#C9A227] text-sm'>
                    You May Also Like
                </p>

                <h1 className='text-5xl font-serif text-[#111111] mt-2'>
                    Related Products
                </h1>

                <div className='w-24 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full'></div>
            </div>

            {/* Products */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                {
                    relatedProducts.map((item) => (
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

export default RelatedProducts;
