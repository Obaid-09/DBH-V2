import React from 'react'
import logo from '../Assets/logo.jpg'
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-[#111111] text-white pt-16 pb-8 px-8 mt-20'>

      <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12'>

        {/* Brand */}
        <div>
          <div className='flex items-center justify-center gap-3'>
            <img
              src={logo}
              alt='DBH Logo'
              className='w-14 h-14 rounded-full object-cover'
            />

            <div>
              <h2 className='text-2xl font-serif font-semibold'>
                DBH
              </h2>

              <p className='text-[#C9A227] text-xs uppercase tracking-[3px]'>
                Dubai Burqa House
              </p>
            </div>
          </div>

          <p className='text-gray-400 mt-6 leading-7'>
            Bringing elegance, modesty, and luxury together through
            premium Abayas and Scarfs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-xl font-semibold mb-6 text-[#C9A227]'>
            Quick Links
          </h3>

          <ul className='space-y-3 text-gray-400'>
            <li className='hover:text-[#C9A227] cursor-pointer'>
              <Link to='/'>Home</Link>
            </li>

            <li className='hover:text-[#C9A227] cursor-pointer'>
              <Link to='/abaya'>Abayas</Link>
            </li>

            <li className='hover:text-[#C9A227] cursor-pointer'>
              <Link to='/scarf'>Scarfs</Link>
            </li>

            <li className='hover:text-[#C9A227] cursor-pointer'>
              <Link to='/cart'>Cart</Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className='text-xl font-semibold mb-6 text-[#C9A227]'>
            Customer Care
          </h3>

          <ul className='space-y-3 text-gray-400'>
            <li className='hover:text-[#C9A227] cursor-pointer'>Contact Us</li>
            <li className='hover:text-[#C9A227] cursor-pointer'>Shipping Policy</li>
            <li className='hover:text-[#C9A227] cursor-pointer'>Return Policy</li>
            <li className='hover:text-[#C9A227] cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className='text-xl font-semibold mb-6 text-[#C9A227]'>
            Contact Us
          </h3>

          <div className='space-y-3 text-gray-400'>
            <p>📍 Nizamabad, Telangana</p>
            <p>📞 +91 70134 17477</p>
            <p>✉️ info@dubaiburqahouse.com</p>
          </div>

          {/* Social Icons */}
          <div className='flex justify-center gap-4 mt-6'>

            <div className='w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#C9A227] transition-all duration-300 cursor-pointer'>
              <FaInstagram />
            </div>

            <div className='w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#C9A227] transition-all duration-300 cursor-pointer'>
              <FaFacebookF />
            </div>

            <div className='w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#C9A227] transition-all duration-300 cursor-pointer'>
              <FaWhatsapp />
            </div>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className='border-t border-gray-700 mt-14 pt-8 text-center text-gray-500'>
        © {new Date().getFullYear()} Dubai Burqa House. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer
