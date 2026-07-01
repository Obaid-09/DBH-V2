// import React, { useEffect, useState } from 'react';
// import API from '../services/api';
// import { ShopContext } from '../Context/ShpContext';
// import { useParams } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// import Breadcrum from '../Components/Breadcrum/Breadcrum';

// const renderStars = (rating) => {
//     const stars = [];

//     for (let i = 1; i <= 5; i++) {
//         if (i <= Math.floor(rating)) {
//             stars.push(
//                 <FaStar key={i} className="text-[#C9A227]" />
//             );
//         }
//         else if (i - rating <= 0.5) {
//             stars.push(
//                 <FaStarHalfAlt key={i} className="text-[#C9A227]" />
//             );
//         }
//         else {
//             stars.push(
//                 <FaRegStar key={i} className="text-[#C9A227]" />
//             );
//         }
//     }
//     return stars;
// };

// const Product = () => {

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     //const { all_products } = useContext(ShopContext);
//     const { productId } = useParams();
//     const [currentImage, setCurrentImage] = useState(0);

//     // Find product
//     // const product = all_products.find(
//     //     (e) => e.id === Number(productId)
//     // );

//     //console.log(product.rating);
//     // Product not found
//     if (!product) {
//         return (
//             <div className='min-h-screen flex justify-center items-center'>
//                 <h1 className='text-3xl font-semibold text-[#111111]'>
//                     Product Not Found
//                 </h1>
//             </div>
//         );
//     }

//     // Use gallery if available otherwise fallback to single image
//     const images = product.gallery || [product.image];


//     const nextImage = () => {
//         setCurrentImage((prev) =>
//             prev === images.length - 1 ? 0 : prev + 1
//         );
//     };

//     const prevImage = () => {
//         setCurrentImage((prev) =>
//             prev === 0 ? images.length - 1 : prev - 1
//         );
//     };

//     return (
//         <div className='bg-[#F8F6F2] min-h-screen'>

//             {/* Breadcrumb */}
//             <Breadcrum product={product} />

//             {/* Product Section */}
//             <div className='max-w-[1300px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16'>

//                 {/* Left Side */}
//                 <div>

//                     {/* Main Image Container */}
//                     <div className='relative bg-white rounded-3xl shadow-md overflow-hidden'>

//                         {/* Left Arrow */}
//                         {
//                             images.length > 1 && (
//                                 <button
//                                     onClick={prevImage}
//                                     className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#C9A227] hover:text-white transition-all duration-300'
//                                 >
//                                     <FaChevronLeft />
//                                 </button>
//                             )
//                         }

//                         {/* Main Image */}
//                         <img
//                             src={images[currentImage]}
//                             alt={product.name}
//                             className='w-full h-[650px] object-cover'
//                         />

//                         {/* Right Arrow */}
//                         {
//                             images.length > 1 && (
//                                 <button
//                                     onClick={nextImage}
//                                     className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#C9A227] hover:text-white transition-all duration-300'
//                                 >
//                                     <FaChevronRight />
//                                 </button>
//                             )
//                         }

//                     </div>

//                     {/* Thumbnails */}
//                     {
//                         images.length > 1 && (
//                             <div className='flex gap-4 mt-6 justify-center flex-wrap'>

//                                 {images.map((img, index) => (
//                                     <img
//                                         key={index}
//                                         src={img}
//                                         alt=''
//                                         onClick={() => setCurrentImage(index)}
//                                         className={`w-[90px] h-[110px] object-cover rounded-xl cursor-pointer border-2 transition-all duration-300
//                                         ${currentImage === index
//                                                 ? "border-[#C9A227]"
//                                                 : "border-gray-200 hover:border-[#C9A227]"
//                                             }`}
//                                     />
//                                 ))}

//                             </div>
//                         )
//                     }

//                 </div>


//                 {/* Right Side */}
//                 <div className='flex flex-col justify-center gap-6'>

//                     <h1 className='text-5xl font-serif text-[#111111]'>
//                         {product.name}
//                     </h1>

//                     <div className='flex items-center gap-2'>

//                         <div className='flex gap-1 text-[#C9A227] text-lg'>
//                             {renderStars(product.rating)}
//                         </div>

//                         <span className='text-gray-500'>
//                             ({product.rating}) • 124 Reviews
//                         </span>

//                     </div>

//                     {/* Price */}
//                     <div className='flex items-center gap-5'>
//                         <p className='text-4xl font-bold text-[#C9A227]'>
//                             ₹{product.new_price}
//                         </p>

//                         <p className='text-2xl text-gray-400 line-through'>
//                             ₹{product.old_price}
//                         </p>
//                     </div>

//                     {/* Description */}
//                     <p className='text-gray-600 leading-8 text-lg'>
//                         Crafted with premium fabric and elegant detailing,
//                         this luxurious piece blends modesty with timeless
//                         sophistication. Perfect for everyday elegance and
//                         special occasions.
//                     </p>

//                     {/* Sizes */}
//                     <div>
//                         <h3 className='text-xl font-semibold mb-4'>
//                             Select Size
//                         </h3>

//                         <div className='flex gap-4'>
//                             {['S', 'M', 'L', 'XL'].map((size) => (
//                                 <button
//                                     key={size}
//                                     className='w-14 h-14 border border-gray-300 rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-300'
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Add to Cart */}
//                     {/* <button 
//                     onClick={() => addToCart(product.id)}
//                     className='w-fit px-12 py-4 bg-[#C9A227] text-white rounded-full font-semibold hover:bg-[#b08d1f] hover:shadow-lg transition-all duration-300'>
//                         Add To Cart
//                     </button> */}
//                     <button
//                         onClick={() => {
//                             console.log("Button Clicked");
//                             addToCart(product.id);
//                         }}
//                     >
//                         Add To Cart
//                     </button>

//                     {/* Category */}
//                     <div className='pt-4 border-t border-gray-200'>
//                         <p className='text-gray-600'>
//                             <span className='font-semibold text-black'>
//                                 Category:
//                             </span>{" "}
//                             <span className='capitalize'>
//                                 {product.category}
//                             </span>
//                         </p>
//                     </div>

//                 </div>

//             </div>
          
//           <RelatedProducts
//               category={product.category}
//               currentProductId={product.id}
//           />
//         </div>
//     );
// };

// export default Product;




import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShpContext';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import API from '../services/api';
import {useAuth} from '../Context/AuthContext.jsx'

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

const Product = () => {

    const { addToCart } = useContext(ShopContext);

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const { user } = useAuth();
    useEffect(() => {
        fetchProduct();
    });

    const fetchReviews = async () => {
        try {
            const res = await API.get(
                `/reviews/${product._id}`
            );

            setReviews(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if(product?._id){
            fetchReviews();
        }
    });

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            await API.post(
                `/reviews/${product._id}`,
                {
                    rating,
                    comment
                },
                {
                    withCredentials: true
                }
            );
            toast.success("Review added");
            setComment("");
            setRating(5);
            fetchReviews();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add review"
            );
            console.log(error);
        }
    };

    const fetchProduct = async () => {
        try {

            const res = await API.get(
                `/products/${productId}`
            );

            console.log(res.data.data);

            setProduct(res.data.data);

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <h1 className='text-3xl'>
                    Loading...
                </h1>
            </div>
        );
    }

    if (!product) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <h1 className='text-3xl font-semibold'>
                    Product Not Found
                </h1>
            </div>
        );
    }

    const images = product.images || [];

    const nextImage = () => {
        setCurrentImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className='bg-[#F8F6F2] min-h-screen'>

            <Breadcrum product={product} />

            <div className='max-w-[1300px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16'>

                {/* Left Side */}

                <div>

                    <div className='relative bg-white rounded-3xl shadow-md overflow-hidden'>

                        {
                            images.length > 1 && (
                                <button
                                    onClick={prevImage}
                                    className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg'
                                >
                                    <FaChevronLeft />
                                </button>
                            )
                        }

                        <img
                            src={images[currentImage]}
                            alt={product.name}
                            className='w-full h-[650px] object-cover'
                        />

                        {
                            images.length > 1 && (
                                <button
                                    onClick={nextImage}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg'
                                >
                                    <FaChevronRight />
                                </button>
                            )
                        }

                    </div>

                    {
                        images.length > 1 && (

                            <div className='flex gap-4 mt-6 justify-center flex-wrap'>

                                {images.map((img, index) => (

                                    <img
                                        key={index}
                                        src={img}
                                        alt=''
                                        onClick={() => setCurrentImage(index)}
                                        className={`w-[90px] h-[110px] object-cover rounded-xl cursor-pointer border-2
                                        ${currentImage === index
                                                ? "border-[#C9A227]"
                                                : "border-gray-200"
                                            }`}
                                    />

                                ))}

                            </div>
                        )
                    }

                </div>

                {/* Right Side */}

                <div className='flex flex-col justify-center gap-6'>

                    <h1 className='text-5xl font-serif text-[#111111]'>
                        {product.name}
                    </h1>

                    <div className='flex items-center gap-3 mt-3'>
                        <span className='text-[#C9A227] text-xl'>
                            ⭐ {product.averageRating?.toFixed(1) || 0}
                        </span>

                        <span className='text-gray-500'>
                            ({product.numReviews || 0} Reviews)
                        </span>
                    </div>

                    <div className='flex items-center gap-5'>

                        <p className='text-4xl font-bold text-[#C9A227]'>
                            ₹{product.price}
                        </p>

                        {
                            product.originalPrice > 0 && (
                                <p className='text-2xl text-gray-400 line-through'>
                                    ₹{product.originalPrice}
                                </p>
                            )
                        }

                    </div>

                    <p className='text-gray-600 leading-8 text-lg'>
                        {product.description}
                    </p>

                    {/* Sizes */}

                    {
                        product.sizes?.length > 0 && (

                            <div className='flex gap-4 flex-wrap'>
                                {['S','M','L','XL'].map((size)=>(
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 border rounded-lg
                                        ${
                                            selectedSize === size
                                            ? "bg-[#C9A227] text-white"
                                            : "border-gray-300"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        )
                    }

                    {/* <button
                        onClick={() => addToCart(product._id)}
                        className='w-fit px-12 py-4 bg-[#C9A227] text-white rounded-full font-semibold hover:bg-[#b08d1f]'
                    >
                        Add To Cart
                    </button> */}
                    <button
                        onClick={() => {

                            if(!selectedSize){
                                toast.error("Please select size");
                                return;
                            }

                            addToCart(product._id, selectedSize);
                        }}
                        className='w-fit px-12 py-4 bg-[#C9A227] text-white rounded-full font-semibold hover:bg-[#b08d1f]'
                    >
                        Add To Cart
                    </button>

                    <div className='pt-4 border-t border-gray-200'>

                        <p className='text-gray-600'>

                            <span className='font-semibold text-black'>
                                Category:
                            </span>{" "}

                            <span className='capitalize'>
                                {product.category}
                            </span>

                        </p>

                    </div>

                </div>

            </div>
            
            <div className='mt-16'>
                <h2 className='text-3xl font-serif mb-8'>
                    Customer Reviews
                </h2>
                {
                    user && (
                        <form
                            onSubmit={submitReview}
                            className='bg-white p-6 rounded-2xl shadow mb-10'
                        >
                            <h3 className='text-xl font-semibold mb-4'>
                                Write a Review
                            </h3>

                            {/* Rating */}
                            <select
                                value={rating}
                                onChange={(e) =>
                                    setRating(Number(e.target.value))
                                }
                                className='border p-3 rounded-xl mb-4 w-full'
                            >
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                            {/* Comment */}
                            <textarea
                                rows="4"
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                                placeholder='Write your review...'
                                className='w-full border rounded-xl p-4 mb-4'
                            />
                            <button
                                type='submit'
                                className='bg-[#C9A227] text-white px-8 py-3 rounded-full'
                            >
                                Submit Review
                            </button>
                        </form>
                    )
                }

            </div>

            <div className='space-y-6'>
                {
                    reviews.length === 0 ? (
                        <p>No reviews yet.</p>

                    ) : (
                        reviews.map((review) => (
                            <div
                                key={review._id}
                                className='bg-white p-6 rounded-2xl shadow'
                            >
                                <div className='flex justify-between'>
                                    <h3 className='font-semibold text-lg'>
                                        {
                                            review.user?.fullname ||
                                            review.user?.username
                                        }
                                    </h3>
                                    <span className='text-[#C9A227]'>
                                        ⭐ {review.rating}/5
                                    </span>
                                </div>
                                <p className='text-gray-600 mt-3'>
                                    {review.comment}
                                </p>
                                <p className='text-sm text-gray-400 mt-3'>
                                    {
                                        new Date(
                                            review.createdAt
                                        ).toLocaleDateString()
                                    }
                                </p>
                            </div>
                        ))
                    )
                }

            </div>

            <RelatedProducts
                category={product.category}
                currentProductId={product._id}
            />

        </div>
    );
};

export default Product;
