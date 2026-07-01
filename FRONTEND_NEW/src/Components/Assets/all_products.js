// src/Components/Assets/all_product.js

import p1_img from '../Assets/product1.jpg'
import p2_img from '../Assets/product1.jpg'
import p3_img from '../Assets/product1.jpg'
import p4_img from '../Assets/product1.jpg'

import p5_img from '../Assets/product2.jpg'
import p6_img from '../Assets/product2.jpg'
import p7_img from '../Assets/product2.jpg'
import p8_img from '../Assets/product2.jpg'

const all_products = [
  {
    id: 1,
    name: "Luxury Satin Abaya",
    category: "abaya",
    image: p1_img,
    gallery: [p1_img, p1_img, p1_img, p1_img],
    new_price: 2499,
    old_price: 2999,
    rating: 4.8
  },

  {
    id: 2,
    name: "Premium Embroidered Abaya",
    category: "abaya",
    image: p2_img,
    gallery: [p2_img, p2_img, p2_img, p2_img],
    new_price: 2799,
    old_price: 3299,
    rating: 4.4
  },

  {
    id: 3,
    name: "Elegant Open Front Abaya",
    category: "abaya",
    image: p3_img,
    gallery: [p3_img, p3_img, p3_img, p3_img],
    new_price: 2299,
    old_price: 2799,
    rating: 4.2
  },

  {
    id: 4,
    name: "Dubai Luxury Abaya",
    category: "abaya",
    image: p4_img,
    gallery: [p4_img, p4_img, p4_img, p4_img],
    new_price: 3199,
    old_price: 3799,
    rating: 4.5
  },

  {
    id: 5,
    name: "Classic Silk Scarf",
    category: "scarf",
    image: p5_img,
    gallery: [p5_img, p5_img, p5_img, p5_img],
    new_price: 699,
    old_price: 999,
    rating: 4.3
  },

  {
    id: 6,
    name: "Premium Chiffon Hijab",
    category: "scarf",
    image: p6_img,
    gallery: [p6_img, p6_img, p6_img, p6_img],
    new_price: 799,
    old_price: 1099,
    rating: 4.8
  },

  {
    id: 7,
    name: "Luxury Satin Hijab",
    category: "scarf",
    image: p7_img,
    gallery: [p7_img, p7_img, p7_img, p7_img],
    new_price: 899,
    old_price: 1199,
    rating: 4.7
  },

  {
    id: 8,
    name: "Everyday Modest Scarf",
    category: "scarf",
    image: p8_img,
    gallery: [p8_img, p8_img, p8_img, p8_img],
    new_price: 599,
    old_price: 799,
    rating: 4.6
  }
];

export default all_products;