import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import firebase from '../firebase';
import './ReadArticle.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import ViewComments from './ViewComments';

function ReadArticle() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [article, setArticle] = useState('');
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState('');
    const [commentator, setCommentator] = useState('');
    const [reads, setReads] = useState(0);// State variable for the number of reads.

    useEffect(() => {
        const db = firebase.database();
        const reference = db.ref('Newsletters/' + id);

        // Fetch the article content
        reference.on('value', (snapshot) => {
            const data = snapshot.val();
            setTitle(data.title);
            setImage(data.image);
            setDescription(data.description);
            setArticle(data.content.replace(/\n/g, '<p>'));
        });

        // Increment the read count after one minute
        const timeout = setTimeout(() => {
            const readsRef = db.ref(`Reads/${id}`);
            readsRef.transaction((currentReads) => {
                return (currentReads || 0) + 1;
            });
        }, 30000);

        // Fetch the read count from the database
        const readsRef = db.ref(`Reads/${id}/`);
        readsRef.on('value', (snapshot) => {
            const readCount = snapshot.val() || 0;
            setReads(readCount);
        })

        // Fetch comments for the specific article
        const commentsRef = db.ref("Comments").orderByChild('articleId').equalTo(id);
        commentsRef.on('value', (snapshot) => {
            const commentsData = snapshot.val();
            if (commentsData) {
                const commentsList = Object.values(commentsData);
                setComments(commentsList);
            }
        });

        // Clean up listeners
        return () => {
            clearTimeout(timeout);
            reference.off();
            commentsRef.off();
        }
    }, [id]);

    // Handle Adding Comments
    const handleComments = () => {
        if (newComments.trim() !== '') {
            const db = firebase.database();
            const commentsRef = db.ref("Comments");
            const newCommentRef = commentsRef.push();
            const timestamp = new Date().toLocaleString();
            newCommentRef.set({
                articleId: id,
                commentator: commentator,
                comment: newComments,
                timestamp: timestamp
            }, (error) => {
                if (error) {
                    console.error("Error adding comment", error);
                } else {
                    setCommentator('');
                    setNewComments('');
                }
            });
        }
    }

    return (
        <div>
            <nav className='back-to-home'>
                <Link to="/HomePage">Kamati YMM</Link>
            </nav>
            <div className='article-display'>
                <h2>{title}</h2>
                {image && <img src={image} alt={title} />}
                <h3>{description}</h3>
                <div dangerouslySetInnerHTML={{ __html: article }} />
            </div>
            <div className='read-count'>
                <p><i className="fa fa-eye" aria-hidden="true"></i> {reads}</p>
            </div>
            <div className='comments-section'>
                <h3>Comments</h3>
                <input type='text' placeholder='Your name...'
                    value={commentator}
                    onChange={(e) => setCommentator(e.target.value)} />
                <textarea
                    rows='4'
                    value={newComments}
                    onChange={(e) => setNewComments(e.target.value)}
                    placeholder='Add your comment'
                />
                <button onClick={handleComments}>Add Comment</button>
            </div>
            <ViewComments comments={comments} />
        </div>
    );
}

export default ReadArticle;
