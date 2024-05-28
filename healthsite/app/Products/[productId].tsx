'use client'

import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import db from '../../firebase'; // Replace with your Firebase configuration path
import { useRouter } from 'next/router';

type Products = {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  price: string;
};

function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;
  const [productDetails, setProductDetails] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null); // Reset error on each fetch attempt

      try {
        if (!productId) return; // Handle missing productId gracefully

        const productRef = doc(db, `Products/${productId}`);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProductDetails(productSnap.data() as Products);
        } else {
          console.log('Product not found.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {productDetails && (
        <div>
          <h1>{productDetails.name}</h1>
          <img src={productDetails.imageUrl} alt={productDetails.name} />
          <p>{productDetails.description}</p>
          <p>{productDetails.price}</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;