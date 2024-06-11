'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #413333; /* Adjust color as needed */
  margin: 12px 0; /* Adjust spacing as needed */
`;

// Define the shape of the product data
interface ProductInfo {
  name: string;
  description: string;
  price: number; // Ensures price is a number for calculations
  imageUrl: string;
  quantity: number;
}

function Page() {
  const [cartProduct, setCartProduct] = useState<ProductInfo[]>([]);
  const [checkout, setCheckOut] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('cart') || '[]');
    // Set default quantity for existing products in cart
    const updatedCart = product.map((item: ProductInfo) => ({
      ...item,
      quantity: item.quantity || 1, // Set quantity to 1 if not defined
    }));
    setCartProduct(updatedCart);
  }, []); // Empty dependency array to run only once on component mount

  const handleQuantityChange = (productId: string, change: number) => {
    setCartProduct((prevCart) => {
      const updatedCart = prevCart.map((product) => {
        if (product.name === productId) {
          // Update quantity for the product being modified
          const newQuantity = Math.max(1, product.quantity + change); // Ensure quantity stays positive
          return { ...product, quantity: newQuantity };
        } else {
          return product; // Keep other items unchanged
        }
      });
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    setCheckOut(true);
    setTimeout(() => {
      setCheckOut(false);
      navigate.push('/login') 
    }, 2000)

  };

  if (checkout){
    return <div>Sign in to check out...</div>
  }
  const cancelCart = () => {
    setCartProduct([]); // Set cartProduct to an empty array
    localStorage.removeItem('cart'); // Clear localStorage cart data (optional)
    console.log('All products removed from cart');
  };

  const deleteProductFromCart = (productName: string) => {
    // Filter out the product to be deleted from the cart
    setCartProduct((prevCart) => prevCart.filter((product) => product.name !== productName));
    
    // Optionally, update localStorage to reflect the change
    const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const filteredCart = updatedCart.filter((product: ProductInfo) => product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    console.log('Product removed from cart:', productName);
  };

  return (
    <div>
      <header className='flex justify-between bg-green-500 text-white p-4'>
        <h3>logo</h3>
        <div className="flex justify-between items-center w-20 h-6   mr-4">
          <Link href='/'><i className="fas fa-home text-xl"></i></Link>
          <i className="fas fa-shopping-cart text-xl"></i>
        </div>
      </header>
        <div className='mx-2'>
          <ul className="flex items-center space-x-2 text-gray-600 mt-2">
            <li><a href="/" className="text-gray-800 hover:text-blue-500">Home{'>'}</a></li>
            <li><a href="/Shop" className="text-gray-800 hover:text-blue-500">Shop{'>'}</a></li>
            <li><a href="/cart" className="text-gray-800 hover:text-blue-500">Cart{'>'}</a></li>
          </ul>
          <SeparatorLine />
            <div>
            {cartProduct.map((product) => (
              <div key={product.name} className='flex flex-col justify-center items-center'>
                <h2 className='font-semibold text-center'>{product.name}</h2>
                <div className="flex justify-center items-center text-sm text-gray-500">
                  {/* Mock Star Rating */}
                  <span className="star-filled">&#9733;</span>
                  <span className="star-filled">&#9733;</span>
                  <span className="star-filled">&#9733;</span>
                  <span className="star-filled">&#9733;</span>
                  <span className="star-empty">&#9733;</span>
                  {/* (replace with logic to populate rating based on product.rating) */}
              </div>
              <p className="text-xl text-green-500 font-semibold flex justify-center">
                KES {product.price * product.quantity}/-
              </p>
                <div className="flex flex-center items-center m-4 space-x-4">
                  <button
                    className="w-14 h-8 border border-gray-300 bg-gray-200"
                    onClick={() => handleQuantityChange(product.name, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={product.quantity}
                    className="w-14 h-8  text-center"
                    onChange={(event) => {
                      const newQuantity = parseInt(event.target.value, 10);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        // Update quantity only if it's a valid number and positive
                        handleQuantityChange(product.name, newQuantity - product.quantity);
                      }
                    }}
                  />
                  <button
                    className="w-14 h-8 border border-gray-300 bg-gray-200"
                    onClick={() => handleQuantityChange(product.name, 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => deleteProductFromCart(product.name)}
                className='underline'>
                  Remove
                </button>
              <SeparatorLine />
              </div>
            ))}
            <div className="flex justify-between m-6">
              <button className="px-4 py-2 rounded-md focus:outline-none border border-yellow-300" onClick={cancelCart}>
                  Cancel
              </button>
              <button className="px-4 py-2 rounded-md focus:outline-none border border-green-500 text-green-500" onClick={handleCheckout}>
                Check out
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Page;