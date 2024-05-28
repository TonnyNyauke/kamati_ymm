'use client'

import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase'; // Replace with your Firebase configuration path
import { useEffect, useState } from 'react';
import Link from 'next/link';

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

      const fetchedProducts: Products[] = []; // Create an empty array to store products

      snapshot.forEach((prodDoc) => {
        fetchedProducts.push({ ...prodDoc.data(), id: prodDoc.id } as Products);
      });

      setProducts(fetchedProducts); // Set products state with the fetched data
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    // No need for router manipulation here
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className='border border-gray-300 rounded-lg m-6 items-center'>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt='image' />
          <h3 className='font-semibold'>{product.price}</h3>
          <Link href={`/Products/[productId]/${product.id}`}>
            <button className='bg-green-500 border rounded-sm'>Check it out</button>
          </Link>
        </div>
      ))}
    </div>
  );
} // Import Link component for navigation

export default Page;
