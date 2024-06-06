'use client'

import React, { ChangeEvent, FormEvent } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import {db, auth }from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SeparatorLine = styled.div`
  width: 60%;
  height: 5px;
  background-color: #413333; /* Adjust color as needed */
  margin: 14px auto; /* Adjust spacing as needed */
  border-radius: 2px;

`;

interface UserInfo {
  fullName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

function Page() {
  const [details, setDetails] = useState<UserInfo>({
    fullName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    try {
      const {fullName, userName , phoneNumber, email, password} = details;
      const userRef = collection(db, "Users");
      const newUser = {
        fullName: fullName,
        username: userName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      }
      await addDoc(userRef, newUser);
      alert("User added successfully");

    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (data : ChangeEvent<HTMLInputElement>) => {
    const {name, value} = data.target;
    setDetails({...details, [name]: value});
  }
  //Handle google sign up
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //Check if user already exists in Firestore
      const usersRef = collection(db, 'Users');
      const q = query(usersRef, where('email', '==', user.email))
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty){
        //New user, create a doc in firestore
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        await addDoc(usersRef, userData);
        alert("Sign up successful");
      }else{
        alert("You already have an account")
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='px-4 min-h-full'>
      <h1 className='text-2xl font-semibold m-2 text-center'>Create Account</h1>
        <form onSubmit={handleSubmit}>
            <div>
              <div className="form-field">
                <input type="text" name='fullName' value={details.fullName} onChange={handleInputChange}/>
                <label htmlFor="full-name">Full Name</label>
              </div>
            </div>
            <div  className="form-field">
                <input type="text" name='userName' value={details.userName} onChange={handleInputChange}/>
                <label htmlFor="user-name">Username</label>
              </div>
            <div>
              <div className="form-field">
                <input type="text" name='phoneNumber' value={details.phoneNumber} onChange={handleInputChange}/>
                <label htmlFor="phone-number">Phone number</label>
              </div>
              <div  className="form-field">
                <input type="text" placeholder='example@domain.com'
                name='email' value={details.email} onChange={handleInputChange}/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div  className="form-field">
                <input type="text" placeholder='********'
                name='password' value={details.password} onChange={handleInputChange}
                className=''
                />
                <label htmlFor="password">Password</label>
            </div>
              
        <div className="flex flex-col justify-center space-y-4">
            <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              Sign up
            </button>
            <button className="w-full py-2 px-4 rounded-md bg-gray-300"
            onClick={handleGoogleSignUp}
            >
             <i className='fab fa-google'></i> Sign up with Gmail
            </button>
            <button className="w-full py-2 px-4 bg-gray-300 rounded-md hover:bg-blue-700">
            <i className='fab fa-facebook-f'></i> Sign up with Facebook
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className=" text-green-500 hover:text-green-700">
                login
              </a>
            </p>
          </div> 
        </form>
        <SeparatorLine />
    </div>
  )
}

export default Page;