import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import img1 from "../Assets/Abaya.jpg";
import img2 from "../Assets/abaya2.jpg";
import img3 from "../Assets/Scarves.jpg";

const Hero = () => {
  const images = [img1, img2, img3];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    // <section className="relative w-full h-[85vh] overflow-hidden">

    //   {/* Images */}
    //   {images.map((image, index) => (
    //     <img
    //       key={index}
    //       src={image}
    //       alt=""
    //       className={`absolute w-full h-full object-cover transition-all duration-700 ${
    //         index === current
    //           ? "opacity-100"
    //           : "opacity-0"
    //       }`}
    //     />
    //   ))}

    //   {/* Overlay */}
    //   <div className="absolute inset-0 bg-black/30"></div>

    //   {/* Text Content */}
    //   <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">

    //     <p className="uppercase tracking-[6px] text-[#C9A227] mb-4">
    //       New Collection 2026
    //     </p>

    //     <h1 className="text-6xl font-serif font-semibold mb-6">
    //       New Arrivals
    //     </h1>

    //     <p className="max-w-xl text-lg mb-8">
    //       Discover elegance and luxury with our latest
    //       premium Abaya collection.
    //     </p>

    //     <button className="px-8 py-3 bg-[#C9A227] rounded-full font-semibold hover:bg-[#b08d1f] transition-all duration-300">
    //       Shop Now
    //     </button>
    //   </div>

    //   {/* Left Arrow */}
    //   <button
    //     onClick={prevSlide}
    //     className="absolute left-6 top-1/2 -translate-y-1/2 z-20
    //     bg-white/20 backdrop-blur-sm p-3 rounded-full
    //     hover:bg-[#C9A227] transition-all duration-300"
    //   >
    //     <FiChevronLeft className="text-white text-3xl" />
    //   </button>

    //   {/* Right Arrow */}
    //   <button
    //     onClick={nextSlide}
    //     className="absolute right-6 top-1/2 -translate-y-1/2 z-20
    //     bg-white/20 backdrop-blur-sm p-3 rounded-full
    //     hover:bg-[#C9A227] transition-all duration-300"
    //   >
    //     <FiChevronRight className="text-white text-3xl" />
    //   </button>

    //   {/* Dots */}
    //   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
    //     {images.map((_, index) => (
    //       <div
    //         key={index}
    //         onClick={() => setCurrent(index)}
    //         className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
    //           current === index
    //             ? "bg-[#C9A227] w-8"
    //             : "bg-white"
    //         }`}
    //       ></div>
    //     ))}
    //   </div>
    // </section>
  
    <section className="w-full py-10 bg-[#F8F8F8] mb-5">

    <div className="relative w-[80%] h-[80vh] mx-auto">

        {/* Image */}
        <img
            src={images[current]}
            alt=""
            className="w-full h-full object-cover rounded-2xl shadow-xl"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25 rounded-2xl"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">

            <p className="uppercase tracking-[8px] text-[#C9A227] mb-4">
                New Collection 2026
            </p>

            <h1 className="text-7xl font-serif font-bold mb-6">
                New Arrivals
            </h1>

            <p className="text-xl mb-10 max-w-2xl text-center">
                Discover elegance and luxury with our latest premium Abaya collection.
            </p>

            <button className="px-10 py-4 bg-[#C9A227] rounded-full text-lg font-semibold hover:bg-[#b08d1f] transition-all duration-300">
                Shop Now
            </button>

        </div>

        {/* Left Arrow */}
        <button
            onClick={prevSlide}
            className="absolute top-1/2 md:-left-20 -left-10 -translate-y-1/2
                       bg-white shadow-lg rounded-full p-4
                       hover:bg-[#C9A227] hover:text-white
                       transition-all duration-300"
        >
            <FiChevronLeft className="md:text-4xl sm:text-3xl text-2xl" />
        </button>

        {/* Right Arrow */}
        <button
            onClick={nextSlide}
            className="absolute top-1/2 md:-right-20 -right-10 -translate-y-1/2
                       bg-white shadow-lg rounded-full p-4
                       hover:bg-[#C9A227] hover:text-white
                       transition-all duration-300"
        >
            <FiChevronRight className="md:text-4xl sm:text-3xl text-2xl" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {images.map((_, index) => (
                <div
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-3 rounded-full cursor-pointer transition-all duration-300
                        ${current === index
                            ? "w-10 bg-[#C9A227]"
                            : "w-3 bg-white"
                        }`}
                />
            ))}
        </div>

    </div>

</section>
);
};

export default Hero;

