import React from 'react'
import { useState,useEffect } from 'react';
import { app } from '../firebaseConfig'
import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router';
import { collection } from 'firebase/firestore';

const Login = () => {
    const [email, setemail] = useState('');
    const [password,setpassword]=useState('');
    const auth=getAuth();
    const googleProvider =new GoogleAuthProvider();
    const router=useRouter();
    const signUp=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((response)=>{
            sessionStorage.setItem('Token',response.user.accessToken)
            router.push('/home')
        })
        .catch((err)=>{
          alert("Already exists");
        })
    }
    const signUpwithGoogle=()=>{
        signInWithPopup(auth,googleProvider)
        .then((response)=>{
            sessionStorage.setItem('Token',response.user.accessToken)
            router.push('/home')
        })
    }
    useEffect(() => {
      let token=sessionStorage.getItem('Token')
      if(!token){
        router.push('/register')
      }
    }, [])
  return (
    <div className='flex items-center justify-center h-screen flex-col text-2xl'>
        <h1 className='text-3xl'>Login</h1>
        <input 
            placeholder='Email' 
            className='mt-5 input-box pl-3 border border-cyan-800 focus:text-gray-600' 
            onChange={(e)=> setemail(e.target.value)}
            value={email}
            type="email"
            />
        <input 
            placeholder='Password' 
            className='mt-1 focus:text-gray-600 input-box border border-cyan-800 pl-3' 
            onChange={(e)=> setpassword(e.target.value)}
            value={password}
            type="password"
            />
        <button 
            onClick={signUp}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-5">
            Sign Up
        </button>
        <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-5"
            onClick={signUpwithGoogle}
        >
            Sign Up with Google
        </button>
    </div>
  )
}

export default Login