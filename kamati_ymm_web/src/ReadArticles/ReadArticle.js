import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import firebase from '../firebase';
import './ReadArticle.css'

function ReadArticle() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [article, setArticle] = useState('');

    useEffect(() => {
        const db = firebase.database();
        const reference = db.ref('Newsletters/' + id);

        reference.on('value', (snapshot) => {
            const data = snapshot.val();
            setTitle(data.title);
            setImage(data.image);
            setDescription(data.description);
            setArticle(data.content);
        });
    }, [id]);
  return (
    <div>
        <nav className='back-to-home'>
            <Link to="/HomePage">Kamati YMM</Link>
        </nav>
        <div className='article-display'>
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            <h3>{description}</h3>
            <p>{article}</p>
        </div>
    </div>
  )
}

export default ReadArticle