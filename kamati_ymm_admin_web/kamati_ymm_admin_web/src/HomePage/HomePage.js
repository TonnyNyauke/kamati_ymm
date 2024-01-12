import React, { useState } from 'react'
import firebase from '../firebase.js';
import '../firebase.js'
import {useNavigate} from 'react-router-dom'

function HomePage() {
  const [phoneNumber] = useState('');
  const [password] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      //Sign in with firebase authentication
      const adminCredentials = await firebase.auth().signInWithEmailAndPassword(phoneNumber, password);

      //Retrieve user details from realtime database
      const snapshot = await firebase.database().ref('Admins/' + adminCredentials.user).once('value');
      const userData = snapshot.val();

      //Check if user is an admin
      if (userData && userData.isAdmin)
      {
        console.log("Access granted")
        navigate('/admin');
      }
      else{
        console.log("Access Denied");
      }
      
    } catch (error) {
      console.log("Error during login", error);
      
    }

  }
  return (
    <div className='adminPage'>
      <form className='adminlogin' method='POST' onSubmit={handleLogin}>
        <input type='text' placeholder='Phone Number'/>
        <input type='text' placeholder='Password'/>
        <button type='submit' className='loginBtn' onClick={handleLogin}>login</button>
      </form>
    </div>
  )
}

export default HomePage