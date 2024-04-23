import React, { useState, useEffect } from 'react'
import '../firebase'
import firebase from '../firebase'

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const shopRef = firebase.database().ref('Departments').child('Sales And Marketing').child('Shop').child('Products');
    shopRef.on('value', (snapshot) => {
      const categories = snapshot.val();
      const productList = [];
      for (let category in categories){
        let products = categories[category];
        for (let id in products) {
          productList.push({ id, ...products[id] });
        }
      }
      setProducts(productList);
    });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.product_name}</h1>
          <p>{product.price}</p>
          <img src={product.image} alt={product.product_name} />
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
  
}

export default Shop