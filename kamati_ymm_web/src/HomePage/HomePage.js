import React, { useEffect, useState } from 'react'
import '../App.css'
import './HomePage.css';
import '../firebase.js'
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import '../ReadArticles/ReadArticle.css'

function HomePage() {
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [message, setMessage] = useState(''); //state variable for the message
    const [showForm, setShowForm] = useState(true); //State variable for form visibility
    const [newsletters, setNewsletters] = useState([]); //State variable for retrieving newsletters

 //This hook retrieves newsletters from the database (It's the equivalent of componentDidMount() in class components)
 useEffect(() => {
    const ref = firebase.database().ref("Newsletters"); //Creates reference to "Newsletter" node
    ref.on('value', (snapshot) => { //Sets up a listener on the "Newsletter" node
        const newsletters = snapshot.val(); //Gets data from "Newsletter" node
        const newsletterList = [];
        for (let id in newsletters){ //Iterates over the properties of newsletters object
            newsletterList.push({id, ...newsletters[id]});
        }
        setNewsletters(newsletterList);
    });
},[]);



    const newsletterSignup = async (event) => {
        event.preventDefault();

        try{
            //add email to your realtime database collection
            const ref = firebase.database().ref('Newsletter Subsribers');
            const newSubscriberRef = ref.push();
            await newSubscriberRef.set({phonenumber, email});

            //Set a message after subscribing
            setMessage("Thank you for subscribing to our newsletters. Be sure to check your email for our bi-weekly updates");
            setShowForm(false);
            setPhonenumber('');
            setEmail('');

            //Clear message after 5 seconds
            setTimeout(() => {
                setMessage('');
                setShowForm(true);
            }, 5000);
        }
        catch (error){
            console.error('Error adding email', error);
        }
    };
    const downloadBtn = () => {
        console.log('Download in a few');
    };
  return (
    <div className='homepage'>
       <nav className='nav-home'>
        <h2>Kamati YMM</h2>
        <button type='button' className='appDownloadBtn' onClick={downloadBtn}>Download our App</button>
       </nav>
        {/*Sign up form for the Newsletter */}
        <p className='header'>Subscribe to our Newsletters</p>
        {showForm && (<form className='newsletter' method='POST'>
            <input type='text' className='phonenumber' placeholder='Enter phone number' value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}/>
            <input type='email' className='newslettermail' placeholder='Enter your email address' value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <button type='button' className='newsletterBtn' onClick={newsletterSignup}>Subscribe</button>
        </form>)}
        <p>{message}</p> {/**Display the message */}
        {/**Newsletter Display goes here */}
        <div className='newsDisplayContainer'>
        {newsletters.map((newsletters, index) => (
            <div className='newsDiplay' key={index}>
                <div className='newsItem'>
                    <h2 className='title'>{newsletters.title}</h2>
                    <img src={newsletters.image} alt={newsletters.title}/>
                    <p>{newsletters.description}</p>
                    <Link to={`/ReadArticle/${newsletters.id}`} className='readarticle'>Read</Link>
                </div>
            </div>
        ))}
        </div>
        
    </div>
  )
}

export default HomePage