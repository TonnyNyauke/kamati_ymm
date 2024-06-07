'use client'

import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase'; // Replace with your Firebase configuration path
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #413333; /* Adjust color as needed */
  margin: 10px 0; /* Adjust spacing as needed */
`;

const Spacer = styled.div`
height: 100px;
`;

type Products = {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  price: string;
};

function Page() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'Products');
      const snapshot = await getDocs(productsRef);

      const fetchedProducts: Products[] = [];
      snapshot.forEach((prodDoc) => {
        fetchedProducts.push({ ...prodDoc.data(), id: prodDoc.id } as Products);
      });

      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  //Check if product exists in cart already
  const isProductInCart = (product: Products) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return existingCart.some((cartItem: { name: string; }) => cartItem.name === product.name);
  };

  const addToCart = (product: Products) => {
    const isInCart = isProductInCart(product); // Use the function

    if (isInCart) {
      alert('This product is already in your cart!');
      return;
    }

     // Update cart in localStorage (assuming you have a cart structure)
     const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
     const updatedCart = [...existingCart, product];
     localStorage.setItem('cart', JSON.stringify(updatedCart));
     console.log('Product added to cart:', product);

     alert("Product added to cart")
  
  }

  return (
    <div className="container ">  {/* Centered container with padding */}
      <div className='fixed top-0 left-0 right-0'>
        <header className='flex justify-between bg-green-500 text-white p-4
        '>
          <h3>logo</h3>
          <div className="flex justify-between items-center w-20 h-6   mr-4">
            <Link href='/'><i className="fas fa-home text-xl"></i></Link>
            <Link href='/cart'><i className="fas fa-shopping-cart text-xl"></i></Link>
          </div>
        </header>
        <ul className="flex items-center space-x-2 text-gray-600 m-2">
            <li><a href="/" className="text-gray-800 hover:text-blue-500">Home{'>'}</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-500">Shop</a></li>
          </ul>
        <SeparatorLine />
      </div>
      <Spacer />
      <div className='m-3'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">  {/* Responsive grid for mobile and larger screens */}
              {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-lg shadow-md overflow-hidden mb-6 text-center"
            >
              <h2 className="text-md font-semibold text-gray-900 mb-2">{product.name}</h2>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500} // Add a width value
                height={300}
                className="w-full h-28 object-contain object-center"
              />
              <div className="flex justify-center items-center text-sm text-gray-500">
                    {/* Mock Star Rating */}
                    <span className="star-filled">&#9733;</span>
                    <span className="star-filled">&#9733;</span>
                    <span className="star-filled">&#9733;</span>
                    <span className="star-filled">&#9733;</span>
                    <span className="star-empty">&#9733;</span>
                    {/* (replace with logic to populate rating based on product.rating) */}
                  </div>
              <h3 className="text-green-500 font-semibold mb-4 ">KES {product.price}/-</h3>
              <div className="flex justify-between items-center p-4">  {/* Centered content and padding */}
              <button className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none
              " onClick={() => addToCart(product)}>Add to Cart</button>  {/* Styled button */}
                <Link href={`/Products/${product.id}`} className="text-green-500 border border-green-500
              rounded-md px-2 py-2">Check it out</Link>  {/* Styled Link with hover effect */}
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
}

export default Page;
