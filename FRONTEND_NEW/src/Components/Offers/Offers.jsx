import React from 'react'
import Abaya from '../Assets/Abaya.jpg'

const Offers = () => {
  return (
    <section className='w-full py-20 px-10 bg-[#F8F8F8] mb-5'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>

        {/* Left Content */}
        <div className='flex flex-col items-center gap-6'>

          <p className='uppercase tracking-[6px] text-[#C9A227] text-sm font-medium'>
            Limited Edition
          </p>

          <h1 className='text-5xl lg:text-7xl font-serif font-semibold leading-tight text-[#111111]'>
            Exclusive <br />
            Luxury Collection
          </h1>

          <p className='text-gray-600 text-lg leading-9 max-w-[550px]'>
            Discover premium Abayas and elegant Scarfs crafted
            for timeless sophistication and modern modest fashion.
          </p>

          <button className='w-fit px-10 py-4 bg-[#C9A227] text-white rounded-full
                            font-semibold hover:bg-[#b08d1f]
                            hover:shadow-xl transition-all duration-300'>
            Shop Now
          </button>

        </div>

        {/* Right Image */}
        <div className='relative flex justify-center'>

          {/* Decorative Box */}
          {/* <div className='absolute -top-5 -right-5 w-full h-full border-2 border-[#C9A227] rounded-3xl'></div> */}

          <img
            src={Abaya}
            alt='Luxury Abaya'
            className='relative z-10 w-full max-w-[450px]
                       h-[450px] object-cover rounded-3xl
                       shadow-2xl'
          />
        </div>

      </div>
    </section>
  )
}

export default Offers
