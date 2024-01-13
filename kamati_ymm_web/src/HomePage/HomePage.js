import React, { useState } from 'react'
import '../App.css'
import './HomePage.css';
import '../firebase.js'
import firebase from '../firebase.js';

function HomePage() {
    const [email, setEmail] = useState('');
    const newsletterSignup = async (event) => {
        event.preventDefault();

        try{
            //add email to your realtime database collection
            const ref = firebase.database().ref('emails');
            const newEmailRef = ref.push();
            await newEmailRef.set({email});
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
        <form className='newsletter' method='POST'>
            <input type='email' className='newslettermail' placeholder='Enter your email address' value={email}
            onChange={e => setEmail(e.target.value)}/>
            <button type='button' className='newsletterBtn' onClick={newsletterSignup}>Signup</button>
        </form>
        {/**Download App Button */}
        <button type='button' className='appDownloadBtn' onClick={downloadBtn}>Download our App</button>
    </div>
  )
}

export default HomePage