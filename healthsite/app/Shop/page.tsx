'use client'

import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase'; // Replace with your Firebase configuration path
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #413333; /* Adjust color as needed */
  margin: 14px 0; /* Adjust spacing as needed */
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

  return (
    <div className="container ">  {/* Centered container with padding */}
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
            <li><a href="#" className="text-gray-800 hover:text-blue-500">Shop</a></li>
          </ul>
          <SeparatorLine />
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>  {/* Title above image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">  {/* Responsive grid for mobile and larger screens */}
              {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-lg shadow-md overflow-hidden mb-6 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h2>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={208}
                className="w-full h-52 object-contain object-center"
              />
              <div className="flex justify-center items-center text-sm text-gray-500">
                    {/* Mock Star Rating */}
                    <span className="star-filled">&#9733;</span>
                    <span className="star-filled">&#9733;</span>
                    <span className="star-empty">&#9733;</span>
                    <span className="star-empty">&#9733;</span>
                    <span className="star-empty">&#9733;</span>
                    {/* (replace with logic to populate rating based on product.rating) */}
                  </div>
              <h3 className="text-green-500 font-semibold mb-4 ">KES {product.price}/-</h3>
              <div className="flex justify-between items-center p-4">  {/* Centered content and padding */}
                <button className="btn btn-green px-4 py-2 rounded-md focus:outline-none">Add to Cart</button>  {/* Styled button */}
                <Link href={`/Products/${product.id}`} className="text-green-500">Check it out</Link>  {/* Styled Link with hover effect */}
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
}

export default Page;
