import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShpContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";



const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(
                <FaStar key={i} className="text-[#C9A227]" />
            );
        }
        else if (i - rating <= 0.5) {
            stars.push(
                <FaStarHalfAlt key={i} className="text-[#C9A227]" />
            );
        }
        else {
            stars.push(
                <FaRegStar key={i} className="text-[#C9A227]" />
            );
        }
    }

    return stars;
};


const Item = ({ id, image, name, new_price, old_price, rating }) => {
  const {addToCart} = useContext(ShopContext)
  const {
    addToWishlist,
    removeFromWishlist,
    wishlistItems
} = useContext(ShopContext);

// console.log(name, rating);
  return (
    <div className="w-[260px] bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group">

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to = {`/product/${id}`}>
          <img
          onClick={() => window.scrollTo(0, 0)}
          src={image}
          alt={name}
          className="w-full h-[280px] object-cover group-hover:scale-105 transition-all duration-500"
        />
        </Link>

        <div
            className="absolute top-4 right-4 z-10"
            onClick={(e) => {
                e.stopPropagation();

                wishlistItems.some(
                        item => item._id === id
                    )
                        ? removeFromWishlist(id)
                        : addToWishlist(id)
            }}
        >
            {
                wishlistItems.some(item => item._id === id)
                    ? (
                        <FaHeart className="text-[#C9A227] text-2xl cursor-pointer" />
                    )
                    : (
                        <FaRegHeart className="text-white text-2xl cursor-pointer hover:text-[#C9A227] transition-all duration-300" />
                    )
            }
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Product Name */}
        <h3 className="text-[#111111] text-[15px] font-semibold mb-4 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
                {renderStars(rating || 0)}
            </div>

            <span className="text-sm text-gray-500">
                ({rating || 0})
            </span>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-4 mb-5">

          <span className="text-[#C9A227] text-[25px] font-bold">
            ₹{new_price}
          </span>

          <span className="text-gray-400 line-through text-lg">
            ₹{old_price}
          </span>

        </div>

        {/* Button */}
        <button 
            onClick={() => {
            addToCart(id);
        }}
        className="cursor-pointer w-full py-3 bg-[#C9A227] text-white rounded-full font-semibold text-lg hover:bg-[#b08d1f] hover:shadow-lg transition-all duration-300">
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default Item;
