import React, { useEffect, useState } from 'react'
import '../App.css'
import './HomePage.css';
import '../firebase.js'
import firebase from '../firebase.js';

function HomePage() {
    const [subscribersName, setSubscribersName] = useState('');
    const [email, setEmail] = useState('');
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
            await newSubscriberRef.set({subscribersName, email});

            //Set a message after subscribing
            setMessage("Thank you for subscribing to our newsletters. Be sure to check your email for our bi-weekly updates");
            setShowForm(false);
            setSubscribersName('');
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
        <h1>Welcome to Kamati YMM</h1>
        {/*Sign up form for the Newsletter */}
        <p className='header'>Sign up for our Newsletters</p>
        {showForm && (<form className='newsletter' method='POST'>
            <input type='text' className='subscribersName' placeholder='Enter your full name' value={subscribersName}
            onChange={e => setSubscribersName(e.target.value)}/>
            <input type='email' className='newslettermail' placeholder='Enter your email address' value={email}
            onChange={e => setEmail(e.target.value)}/>
            <button type='button' className='newsletterBtn' onClick={newsletterSignup}>Signup</button>
        </form>)}
        <p>{message}</p> {/**Display the message */}
        {/**Download App Button */}
        <button type='button' className='appDownloadBtn' onClick={downloadBtn}>Download our App</button>
        {/**Newsletter Display goes here */}
        {newsletters.map((newsletters, index) => (
            <div key={index}>
                <h2>{newsletters.Title}</h2>
                <p>{newsletters.Newsletter}</p>
            </div>
        ))}
    </div>
  )
}

export default HomePage