'use client'

// Import necessary libraries and components
import { ChangeEvent, FormEvent, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore'; // Import addDoc
import { db } from '../firebase';
import uploadFile from '../uploadFile';

// Define the shape of the product data
interface ProductData {
  file: File | null;
  Name: string;
  Description: string;
  Price: string;
  Category: string;
  imageUrl: string;
  Details: string;
  Usage: string;
}

// Define the main component
function Page() {
  // Initialize state for form data
  const [formData, setFormData] = useState<ProductData>({
    file: null,
    Name: '',
    Description: '',
    Price: '',
    Category: '',
    imageUrl: '',
    Details: '',
    Usage: '',
  });

  // Define the function to handle form submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { Name, Description, Price, Category, Details, Usage } = formData;
      if (!Name.trim()) {
        alert('Name field is empty');
        return; // Exit early if name is empty
      }

      if (formData.file) {
        const uploadPromise = await uploadFile(formData.file);
        if (uploadPromise && uploadPromise.downloadURL) {
          // Generate a unique ID for the product
          const productRef = collection(db, 'Products');
          const newProduct = {
            name: Name,
            description: Description,
            price: Price,
            details: Details,
            usage: Usage,
            imageUrl: uploadPromise.downloadURL,
          };
          await addDoc(productRef, newProduct); // Use addDoc with generated ID
          alert('Upload Successful');
          setFormData({ ...formData, ...initialState }); // Reset form data
        } else {
          alert('Could not upload product');
        }
      } else {
        alert('Please select an image'); // Added check for missing image
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to reset form data (optional)
  const initialState = {
    file: null,
    Name: '',
    Description: '',
    Price: '',
    imageUrl: '',
    Details: '',
    Usage: '',
  };

  // Define the function to handle changes to form inputs
  function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Define the function to handle file input
  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      try {
        setFormData({ ...formData, file });
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle upload error (e.g., display an error message)
      }
    } else {
      alert('Invalid file type. Please select an image.'); // Added validation
    }
  }

  // Render the form
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="file" name="file" onChange={handleFileInput} />
        <input type="text" name="Name" placeholder="Name..." value={formData.Name} onChange={handleInputChange} />
        <textarea name="Description" placeholder="Description" value={formData.Description} onChange={handleInputChange} />
        <input type="text" name="Price" placeholder="Price..." value={formData.Price} onChange={handleInputChange} />
        <select onChange={() => handleInputChange(category}>
          {category.map()}
        </select>
        <textarea name="Details" placeholder="Product Details..." value={formData.Details} onChange={handleInputChange} />
        <textarea name="Usage" placeholder="How to use Products..." value={formData.Usage} onChange={handleInputChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

// Export the component
export default Page;
