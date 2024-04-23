import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './AddProduct.css'
import { useForm } from 'react-hook-form';
import firebase from '../../../firebase';

function AddProducts() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef(null);

    //Upload form here
    const onSubmit = async(data) => {
        try{
            const productsRef = firebase.database().ref('Departments').child('Sales And Marketing')
            .child('Shop').child('Products').child(data.category);
            const newProductRef = productsRef.push();

            // Upload the image to Firebase storage and get the download URL
            const storage = firebase.storage();
            const imageReference = storage.ref('/Product Images/' + fileInputRef.current.files[0].name);
            const uploadTask = await imageReference.put(fileInputRef.current.files[0]);

            const imageURL = await uploadTask.ref.getDownloadURL();
            
            //Upload data to database
            await newProductRef.set({
                date: new Date().toLocaleString(),
                description: data.product_description,
                image: imageURL,
                price: data.price,
                product_name: data.product_name,
                time: new Date().toString(),

            });
            alert('Product Added Succesfully');
                    
    }catch(error){
        console.log(error);
    }
}
    // Function to handle image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
    }
  };
  return (
    <div>
        <nav>
            <Link to='/LandingPage'>Back</Link>
        </nav>
        <form className='add-product-form' onSubmit={handleSubmit(onSubmit)}>
            <h2>Add Product</h2>
            
            <div className='image-container' onClick={() => fileInputRef.current.click()}>
            <input 
                type='file' 
                {...register('image')}
                ref={fileInputRef} 
                onChange={handleImageUpload} 
            />
                {imageSrc && <img src={imageSrc} alt="articleTitle" />}
                {!imageSrc && <p>Click to upload an image</p>}
            </div>
            <input type='text' placeholder='Product Name' 
            {...register('product_name', {required:true})}
            /><br/>
            {errors.product_name && <span>Product Name is required</span>}
            <input type='text' placeholder='Product Price' 
            {...register('price', {required:true})}
            /><br/>
            {errors.product_name && <span>Product price is required</span>}
            <select name="category" 
            {...register('category', {required:true})}
            >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Groceries">Groceries</option>
                <option value="Remedies">Remedies</option>
            </select><br/>
            {errors.category && <span>Category is required</span>}
            <textarea name="description" id="" cols="30" rows="10"
            {...register('product_description', {required:true})}
            />
            <button type='submit'>Add Product</button>
        </form>
    </div>
  )
}

export default AddProducts