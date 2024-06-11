'use client'

import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {auth, db} from '../firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styled from 'styled-components';

const SeparatorLine = styled.div`
  width: 60%;
  height: 5px;
  background-color: #413333; /* Adjust color as needed */
  margin: 14px auto; /* Adjust spacing as needed */
  border-radius: 2px;

`;

interface UserInfo {
  username: string;
  password: string;
}

function Page() {
  const router = useRouter();
  const [login, setLogin] = useState<UserInfo>({
    username: '',
    password: '',
  });

   // Check if user is already logged in on component mount
   useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      router.push('/homepage');
    }
  }, [router]);

  const handleSubmit = async(data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();

    const {username, password} = login;

    //Retrieve user data from Firestore
    const userRef = collection(db, 'Users');
    const nameRef = doc(userRef, username);
    const nameSnap = await getDoc(nameRef);

    if (!nameSnap.exists){
      alert("Username does not exist");
    }

    const userData = nameSnap.data() as UserInfo;
    //Validate user
    if (userData && userData.password !== password){
      alert("Wrong password")
    }else{
      //Set login
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/homepage')
    }
  }

const handleInputChange = (data: ChangeEvent<HTMLInputElement>) => {
  const {name, value} = data.target;

  setLogin({...login, [name] : value});
}

const loginwithGmail = async() => {
  const provider = new GoogleAuthProvider();

  try {
    event?.preventDefault(); //Prevent page reload

    const result = signInWithPopup(auth, provider);
    const user = (await result).user;

    const userRef = collection(db, 'Users');
    const q = query(userRef, where('email', '==', user.email));
    const namesnapshot = await getDocs(q);

    if (!namesnapshot.empty){
      //Store login state
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/homepage')
    }
    else {
      alert("User account does not exist. Create account to continue");
      router.push('/createaccount');
    }

  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="header sm:px-0 flex flex-col justify-center items-center h-screen bg-green-800 mt-auto">
          <div className=' mt-auto login rounded-t-3xl w-full bg-white'>
          <h1 className='text-2xl font-semibold text-center mt-4 text-green-500'>Sign in</h1>
            <form className="px-4 space-y-4 mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange = {handleInputChange}
                  value={login.username}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange = {handleInputChange}
                  value={login.password}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 "
                >
                  Sign in
                </button>
                  <button className="py-2 px-4 bg-gray-300 rounded-md hover:bg-red-700 w-full"
                  onClick={loginwithGmail}
                  >
                  <i className='fab fa-google'></i> Sign in with Gmail
                  </button>
                  <button className="py-2 px-4 bg-gray-300 rounded-md hover:bg-blue-700 w-full">
                  <i className='fab fa-facebook-f'></i> Sign in with Facebook
                  </button>
              </div>
              <p className="text-center text-sm text-gray-600">
                  {"Don't have an account?"}{' '}
                  <Link href="/createaccount" className="text-green-500 hover:text-green-700">
                    Sign up
                  </Link>
                </p>
            </form>
            <SeparatorLine />
          </div>
          
    </div>
  );
}

export default Page;
