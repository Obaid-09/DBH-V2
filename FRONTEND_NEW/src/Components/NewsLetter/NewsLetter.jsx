import React from 'react'

const Newsletter = () => {
  return (
    <section className='w-full py-16 px-6 bg-[#F8F8F8] mb-5'>
      <div className='max-w-4xl mx-auto bg-white rounded-3xl shadow-md px-8 py-10'>

        <div className='text-center'>
          <p className='uppercase tracking-[4px] text-[#C9A227] text-xs font-medium'>
            Stay Updated
          </p>

          <h2 className='text-3xl md:text-4xl font-serif font-semibold text-[#111111] mt-3'>
            Join Our Newsletter
          </h2>

          <p className='text-gray-500 mt-4 max-w-xl mx-auto'>
            Subscribe for new arrivals, exclusive offers, and luxury collections.
          </p>
        </div>

        <div className='mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto'>
          <input
            type='email'
            placeholder='Enter your email'
            className='flex-1 px-5 py-3 border border-gray-300 rounded-full outline-none focus:border-[#C9A227]'
          />

          <button className='px-8 py-3 bg-[#C9A227] text-white rounded-full cursor-pointer font-semibold hover:bg-[#b08d1f] transition-all duration-300'>
            Subscribe
          </button>
        </div>

      </div>
    </section>
  )
}

export default Newsletter
