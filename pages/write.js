// Import React dependencies.
import React, { useState } from 'react'
import {db} from "../firebaseConfig"
import { collection, addDoc } from "firebase/firestore"; 
import Router, { useRouter } from 'next/router';

const Write = () => {
  const [content,setcontent]=useState('')
  const [category,setcategory]=useState('')
  const router=useRouter();

  const Postdata=()=>{
    addDoc(collection(db, "write"), {
      contents:content,
      categorys:category,
    })
    .then(() => {
      alert('Message submitted 👍' );
    })
    .catch((error) => {
      alert(error.message);
    });
    router.push('/home')
  }
    
  return (
    <>
    <div>
      <div className='mb-5 ml-5 mt-5 h-6 w-7'>
        <select onChange={(e)=>{
            setcategory(e.target.value);
        }}>
          <option>Choose</option>
          <option value="Nature">Nature</option>
          <option value="Animal">Animal</option>
          <option value="Art">Art</option>
          <option value="Crypto">Crypto</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      <div className='mt-5 ml-5 text-4xl'>
        <h1>Your list here...</h1>
      </div>
      <div className='editor w-[300px] lg:w-[700px] mt-5 ml-5 mb-5'>
        <input
          className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-gray-100 bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          onChange={(e)=>{
            setcontent(e.target.value);
          }}
        />
      </div>
      <div className='mt-5'>
        <button 
          className='ml-[240px] md:ml-[640px] inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          onClick={Postdata}
        >Post</button>
      </div>
    </div>
  </>
  )
}

export default Write