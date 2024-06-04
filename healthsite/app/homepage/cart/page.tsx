'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
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

  const calculateTotal = () => {
    let totalPrice = 0;
    cartProduct.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  const handleCheckout = () => {
    const invoice = {
      items: cartProduct,
      totalPrice: calculateTotal(),
    };
    setCheckOut(true); // Open the checkout modal
  };

  const handleCloseCheckout = () => {
    setCheckOut(false); // Close the checkout modal
  };

  return (
    <div>
      <header className='flex justify-between bg-green-500 text-white p-4'>
        <h3>logo</h3>
        <div className="flex justify-between items-center w-20 h-6   mr-4">
          <Link href='/homepage'><i className="fas fa-home text-xl"></i></Link>
          <i className="fas fa-shopping-cart text-xl"></i>
        </div>

        </header>
      <div className='mx-2'>
        <ul className="flex items-center space-x-2 text-gray-600 mt-2">
          <li><a href="/homepage" className="text-gray-800 hover:text-blue-500">Home{'>'}</a></li>
          <li><a href="/homepage/cart" className="text-gray-800 hover:text-blue-500">Cart{'>'}</a></li>
        </ul>
        <SeparatorLine />
        <div>
          {cartProduct.map((product) => (
            <div key={product.name}>
              <h2>{product.name}</h2>
              <Image src={product.imageUrl} alt={product.name} width="200" height="200" />
              <p>{product.description}</p>
              <p>
                KES {product.price}
              </p>
              <div className="flex flex-center items-center m-10">
                <button
                  className="w-4 border border-gray-300 hover:bg-gray-200"
                  onClick={() => handleQuantityChange(product.name, -1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={product.quantity}
                  className="w-10 border border-gray-300 text-center"
                  onChange={(event) => {
                    const newQuantity = parseInt(event.target.value, 10);
                    if (!isNaN(newQuantity) && newQuantity >= 1) {
                      // Update quantity only if it's a valid number and positive
                      handleQuantityChange(product.name, newQuantity - product.quantity);
                    }
                  }}
                />
                <button
                  className="w-4 border border-gray-300 hover:bg-gray-200"
                  onClick={() => handleQuantityChange(product.name, 1)}
                >
                  +
                </button>
                <p className="ml-4">
                  Subtotal: KES {product.price * product.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between m-6">
            <button className="px-4 py-2 rounded-md focus:outline-none border border-yellow-300">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md focus:outline-none border border-green-500 text-green-500" onClick={handleCheckout}>
              Check out
            </button>
          </div>
          {checkout && <Checkout items={cartProduct} totalPrice={calculateTotal()} onClose={handleCloseCheckout} />}
        </div>
      </div>
    </div>
  );
}

export default Page;

function Checkout(props: { items: ProductInfo[]; totalPrice: number; onClose: () => void }) {
  const { items, totalPrice, onClose } = props;

  return (
    <div className="checkout-container m-2">
      <h2>Checkout</h2>
      <div className="invoice-items">
        <h3>Items</h3>
        {items.map((item) => (
          <div key={item.name} className="invoice-item">
            <p>{item.name} (x{item.quantity})</p>
            <p>KES {item.price}</p>
          </div>
        ))}
      </div>
      <div className="invoice-summary">
        <h3>Summary</h3>
        <p>Subtotal: KES {totalPrice}</p>
        <p><b>Grand Total: KES {totalPrice}</b></p>
      </div>
      <div className='flex justify-between'>
        <button className='border border-green-500'>Pay Now</button>
        <button onClick={onClose} className='border border-red-400'>Cancel</button>
      </div>
    </div>
  );
}