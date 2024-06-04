'use client'

import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import {db} from '../../firebase'
import Image from 'next/image';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #413333; /* Adjust color as needed */
  margin: 14px 0; /* Adjust spacing as needed */
`;


// Define the shape of the product data
interface ProductInfo {
  file: File | null;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  details: string;
  usage: string;
}

function Page({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //Section selection for Details, How to Use, and Shipping
  const [currentSection, setCurrentSection] = useState('details');

  const sections = {
    details: product?.details,
    how_to_use: product?.usage,
    shipping: 'Delivery within 5 hours of order',
  };

  function handleSectionClick(sectionName: string){
    setCurrentSection(sectionName)
  }


  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productsRef = collection(db, "Products"); // Replace "products" with your collection name
        const docRef = doc(productsRef, params.productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data() as ProductInfo); // Cast to ProductInfo type
        } else {
          // Handle case where document doesn't exist
          console.error("Product not found with ID:", params.productId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]); // Dependency array ensures fetch only on ID change

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCart = (product: ProductInfo) => {
    console.log(product)
    let addedProduct = JSON.parse(localStorage.getItem('cart') || '[]');
    addedProduct.push(product)
    localStorage.setItem('cart', JSON.stringify(addedProduct));
  
  }

  
  return (
    <div className='grid grid-cols-1 '>
      <header className='flex justify-between bg-green-500 text-white p-4'>
        <h3>logo</h3>
        <div className="flex justify-between items-center w-20 h-6   mr-4">
          <Link href='/homepage'><i className="fas fa-home text-xl"></i></Link>
          <i className="fas fa-shopping-cart text-xl"></i>
        </div>

        </header>
      <ul className="flex items-center space-x-2 text-gray-600 mt-2">
        <li><a href="/homepage" className="text-gray-800 hover:text-blue-500">Home{'>'}</a></li>
        <li><a href="/Shop" className="text-gray-800 hover:text-blue-500">Shop{'>'}</a></li>
        <li><a href="#" className="text-gray-800 hover:text-blue-500">Product</a></li>
      </ul>
      <SeparatorLine />
      <h1 className='text-2xl font-semibold flex justify-center m-4'>{product.name}</h1>
      <Image src={product.imageUrl} alt='image' 
      width={500}
      height={208}
      className="w-full h-52 object-contain object-center"
      priority
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
      <h2 className="text-xl text-green-500 font-semibold flex justify-center">KES {product.price}/-</h2>
      <div className="flex justify-between items-center p-4 m-6">
        <button className="btn btn-green px-4 py-2 rounded-md focus:outline-none
        border border-yellow-300" onClick={() => addToCart(product)}>Add to Cart</button>
        <button className="px-4 py-2 rounded-md focus:outline-none text-green-500 border
        border-green-500">Buy now</button>
      </div>
      <div className='flex justify-center'>
        secure payment, e.t.c
      </div>
      <p className="text-gray-700 flex justify-center m-4">{product.description}</p>
      <section className="flex flex-wrap justify-between text-gray-700 m-4">
        <button
          className={`py-2 px-4 rounded-md text-gray-700 hover:text-blue-500 ${
            currentSection === 'details' ? 'bg-green-100 text-green-700' : ''
          }`}
          onClick={() => handleSectionClick('details')}
        >
          Details
        </button>
        <button
          className={`py-2 px-4 rounded-md text-gray-700 hover:text-blue-500 ${
            currentSection === 'how_to_use' ? 'bg-green-100 text-green-700' : ''
          }`}
          onClick={() => handleSectionClick('how_to_use')}
        >
          How to Use
        </button>
        <button
          className={`py-2 px-4 rounded-md text-gray-700 hover:text-blue-500 ${
            currentSection === 'shipping' ? 'bg-green-100 text-green-700' : ''
          }`}
          onClick={() => handleSectionClick('shipping')}
        >
          Shipping
        </button>
      </section>

      <div className="mt-4 border border-gray-300 rounded-lg px-4 py-4 overflow-y-auto h-48">
        {sections[currentSection as keyof typeof sections]}
      </div>
      {/**Reviews section */}
      <div>
        <h3>Reviews</h3>
      </div>
      {/* Display other product properties */}
    </div>
  );
}

export default Page;
