import React, { useState } from 'react'
import '../firebase'
import {getDatabase, ref, onValue} from "firebase/database"
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Check if admin is already logged in
    

    const handleLogin = async (event) => {
      event.preventDefault();

      //Get admin from realtime database
      const db = getDatabase();
      const adminRef = ref(db, "Admins/" + phoneNumber);

onValue(adminRef, (snapshot) => {
  const data = snapshot.val();

  //Validate Admin credentials
  if (data && data.password === password) {
    navigate('HomePage');
    
  }
  else{
    alert("Wrong credentials");
  }
});
    }

  return (
    <div className='formContainer'>
        <form className='adminLoginForm' method='POST' onSubmit={handleLogin}>
            <input type='text' className='phoneNumber' placeholder='Phone Number' 
            onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type='password' className='adminPassword' placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' className='adminLoginBtn'>Login</button>
        </form>
    </div>
  )
}

export default AdminLogin