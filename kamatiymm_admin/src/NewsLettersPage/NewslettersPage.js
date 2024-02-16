import React, { useState, useRef } from 'react';
import firebase from '../firebase'; // Import your Firebase configuration
import './NewsletterPage.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'


const modules = {
  toolbar: [
    [{header: [1,2,3,4,5,6, false]}],
    [{font: []}],
    [{size: []}],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {list: "ordered"},
      {list: "bullet"},
      {indent: "-1"},
      {indent: "+1"},
    ],
    ["link", "image", "video"],
  ]
}
function NewslettersPage() {  
  // State variables to hold article data
  const [articleTitle, setArticleTitle] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const fileInputRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {

      // Get reference to Firebase database
      const db = firebase.database();
      const newsletterPostsRef = db.ref('Newsletters');
      const newNewsletterRef = newsletterPostsRef.push();

      // Upload the image to Firebase storage and get the download URL
      const storage = firebase.storage();
      const imageReference = storage.ref('/ArticleImages/' + fileInputRef.current.files[0].name);
      const uploadTask = imageReference.put(fileInputRef.current.files[0]);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          // Upload successful, get download URL
          const downloadURL = await imageReference.getDownloadURL();
          // Save article data to Firebase database
          await newNewsletterRef.set({
            title: articleTitle,
            image: downloadURL,
            description: description,
            content: article
          });
          // Clear form fields after submission
          setArticleTitle('');
          setImageSrc(null);
          setDescription('');
          setArticle('');
        }
      );
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  return (
    <div className="newsletter-container">
      <form onSubmit={handleFormSubmit} className='newsletters-page'>
        <input 
          type='text' 
          placeholder="Title goes here"
          value={articleTitle} 
          onChange={(e) => setArticleTitle(e.target.value)}
        />
        <input 
          type='file' 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          style={{ display: 'none' }}
        />
        <div className='image-container' onClick={() => fileInputRef.current.click()}>
          {imageSrc && <img src={imageSrc} alt="articleTitle" />}
          {!imageSrc && <p>Click to upload an image</p>}
        </div>
        <textarea 
          placeholder="Description goes here" 
          className="description-container" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='container'>
          <div className='row'>
            <div className='editor'>
              <ReactQuill
                theme='snow'
                value={article}
                onChange={setArticle}
                className='text-editor'
                modules={modules}
              />
            </div>
            
          </div>
        </div>

        <button type='submit' className='sendBtn'>Send</button>
      </form>
    </div>
  );
}

export default NewslettersPage;
