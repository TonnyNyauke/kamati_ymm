'use client'

import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {auth, db} from '../firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
    <div className="px-4 sm:px-0">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Login
        </button>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account?"}{' '}
            <Link href="/createaccount" className="text-green-500 hover:text-green-700">
              Sign up
            </Link>
          </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700"
          onClick={loginwithGmail}
          >
            Login with Gmail
          </button>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Login with Facebook
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
