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
  //deleting product from cart
  const deleteProductFromCart = (productName: string) => {
    // Filter out the product to be deleted from the cart
    setCartProduct((prevCart) => prevCart.filter((product) => product.name !== productName));
    
    // Optionally, update localStorage to reflect the change
    const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const filteredCart = updatedCart.filter((product: ProductInfo) => product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    console.log('Product removed from cart:', productName);
  };
  const cancelCart = () => {
    setCartProduct([]); // Set cartProduct to an empty array
    localStorage.removeItem('cart'); // Clear localStorage cart data (optional)
    console.log('All products removed from cart');
  };
  

  return (
    <div>
      <header className='flex justify-between bg-green-500 text-white p-4'>
        <h3>logo</h3>
        <div className="flex justify-between items-center w-20 h-6 mr-4">
          <Link href='/homepage'><i className="fas fa-home text-xl"></i></Link>
          <i className="fas fa-shopping-cart text-xl"></i>
        </div>

        </header>
      <div className='mx-2'>
        <ul className="flex items-center space-x-2 text-gray-600 m-2">
          <li><a href="/homepage" className="text-gray-800 hover:text-blue-500">Home{'>'}</a></li>
          <li><a href="/homepage/cart" className="text-gray-800 hover:text-blue-500">Cart{'>'}</a></li>
        </ul>
        </div>
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
                <button className="w-14 h-8 border border-gray-300 bg-gray-200"
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
          <p className='text-xl font-bold text-blue-500 text-center'>Total: KES {calculateTotal()}/-</p>
          <div className="flex justify-between m-6">
            <button className="px-4 py-2 rounded-md focus:outline-none border border-yellow-300" onClick={cancelCart}>
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md focus:outline-none border border-green-500 text-green-500" onClick={handleCheckout}>
              Check out
            </button>
          </div>
          {checkout && <Checkout items={cartProduct} totalPrice={calculateTotal()} onClose={handleCloseCheckout} />}
        </div>
      
    </div>
  );
}

export default Page;

function Checkout(props: { items: ProductInfo[]; totalPrice: number; onClose: () => void }) {
  const { items, totalPrice, onClose } = props;
  const [cartProduct, setCartProduct] = useState<ProductInfo[]>([])

const handleIntaSendPayment = async () => {
  // Check if window is defined, indicating that the code is running on the client side
  if (typeof window !== "undefined") {
    const intaSendModule = await import("intasend-inlinejs-sdk");
    const intaSendInstance = new (window as any).IntaSend({
      publicAPIKey: "ISPubKey_live_d22287e5-fe58-4bbc-aa2e-aa71522186a3",
      live: true, // Set to true for the live environment
    });

    // Additional logic for handling payment with IntaSend

    // Use await to ensure the asynchronous initialization is complete
    await new Promise<void>((resolve) => {
      intaSendInstance
        .on("COMPLETE", (response: any) => {
          console.log("COMPLETE:", response);
          resolve();
        })
        .on("FAILED", (response: any) => {
          console.log("FAILED", response);
          resolve();
        })
        .on("IN-PROGRESS", () => {
          console.log("INPROGRESS ...");
          resolve();
        });
    });

    // Continue with the rest of your code
    setCartProduct([]); // Set cartProduct to an empty array
    localStorage.removeItem('cart'); // Clear localStorage cart data (optional)
    console.log('All products removed from cart');
  } else {
    // Handle the case where the window object is not available during SSR
    console.warn(
      "Window object is not available during server-side rendering."
    );
  }
};

useEffect(() => {
  // Call the IntaSend payment handling function after component mount
  handleIntaSendPayment();
}, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className="checkout-container m-2">
      <h2 className='text-xl font-semibold text-center'>Checkout</h2>
      <div className="invoice-items">
        <h3 className='font-semibold text-center'>Items</h3>
        {items.map((item) => (
          <div key={item.name} className="invoice-item">
            <p>{item.name} (x{item.quantity})</p>
            <p className='font-semibold'>KES {item.quantity * item.price}/-</p>
            <SeparatorLine />
          </div>
        ))}
      </div>
        <p><b>Grand Total: KES {totalPrice}</b></p>
      <div className='flex flex-col space-y-2'>
        <button className='intaSendPayButton w-60 px-4 py-2 border text-white bg-green-500 
        text-lg rounded-md' onClick={handleIntaSendPayment}
        data-amount='100'
        data-currency="KES"
        data-phone_number='254742065623'
        data-email='nyaukeindustries@gmail.com'
        data-comment='test'
        data-first_name='Tonny'
        data-last_name='Nyauke'
        data-country='KE'
        data-redirect_url="https://artyfact.vercel.app">Pay KES {totalPrice}</button>
        <button onClick={onClose} className='border w-60 px-4 py-2 text-white
        text-lg bg-red-400 rounded-md'>Cancel</button>
      </div>
    </div>
  );
}