import 'firebase/compat/database';
import 'firebase/compat/storage';
import firebase from '../firebase';
import '../firebase'
import './NewsletterPage.css'
import { useRef, useState } from "react";

function NewslettersPage() {  
  const [articleTitle, setarticleTitle] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  const imageUpload = (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const db = firebase.database();
    const newsletterPostsRef = db.ref('Newsletters');
    const newNewsletterRef = newsletterPostsRef.push();

    //Upload the image tp Firebase storage and get the download URL
    const storage = firebase.storage();
    const imageReference = storage.ref('/ArticleImages/' + fileInputRef.current.files[0].name);
    const uploadTask = imageReference.put(fileInputRef.current.files[0]);

    uploadTask.then(async() => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        await newNewsletterRef.set({
          id: newNewsletterRef.key,
          title:  articleTitle,
          image: downloadURL,
          description:  description,
          content: article,
        });
    
        //Clear form
        setArticle('');
        setImageSrc(null);
        setDescription('');
        setarticleTitle('');
    });
  };

  return (
    <div className="newsletters-page">
      <form onSubmit={handleFormSubmit}>
      <div className="title-container">
        <textarea placeholder="Title goes here"
        value={articleTitle} onChange={(e) => setarticleTitle(e.target.value)}
        />
        <input type='file' ref={fileInputRef} onChange={imageUpload} style={{display: 'none'}}/>
        <div className='image-container' onClick={() => fileInputRef.current.click()}>
          {imageSrc && <img src={imageSrc} alt="articleTitle" ref={imageRef}/>}
          {!imageSrc && <p>Click to upload an image</p>}
          </div>
          <textarea placeholder="Description goes here" className="description-container" 
          value={description} onChange={(e) => setDescription(e.target.value)}/>
        <textarea placeholder="Article goes here" className="article-container"
        value={article} onChange={(e) => setArticle(e.target.value)}/>
        <button type="submit" className="save-button">Send</button>
      </div>
      </form>
    </div> 
  );
}

export default NewslettersPage