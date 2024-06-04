'use client'

import React, { ChangeEvent, FormEvent } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import {db, auth }from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface UserInfo {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

function Page() {
  const [details, setDetails] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    try {
      const {firstName, lastName,userName , phoneNumber, email, password} = details;
      const userRef = collection(db, "Users");
      const newUser = {
        firstName: firstName,
        lastName: lastName,
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
    <div className='px-4'>
      <h1 className='text-2xl font-semibold m-2'>Create Account</h1>
        <form onSubmit={handleSubmit}>
            <div>
              <div className="form-field">
                <input type="text" name='firstName' value={details.firstName} onChange={handleInputChange}/>
                <label htmlFor="first-name">First Name</label>
              </div>
              <div  className="form-field">
                <input type="text" name='lastName' value={details.lastName} onChange={handleInputChange}/>
                <label htmlFor="last-name">Last Name</label>
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
                name='password' value={details.password} onChange={handleInputChange}/>
                <label htmlFor="password">Password</label>
              </div>
              <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Create account
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className=" text-green-500 hover:text-green-700">
            login
          </a>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700"
          onClick={handleGoogleSignUp}
          >
            Sign up with Gmail
          </button>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Sign up with Facebook
          </button>
          </div>
        </form>
    </div>
  )
}

export default Page;