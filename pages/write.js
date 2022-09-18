// Import React dependencies.
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'
import {db} from "../firebaseConfig"
import { collection, addDoc } from "firebase/firestore"; 

const Write = () => {
  const [text,settext]=useState('')
  const [content,setcontent]=useState('')
  const [category,setcategory]=useState('')
  
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
  }
    
  const setn=()=>{
    console.log(parse(text).props.children);
    
  }
  return (
    <>
    <div>
      <div className='mb-5 ml-5 mt-5'>
        <select onChange={(e)=>{
            setcategory(e.target.value);
        }}>
          <option value="Nature">Nature</option>
          <option value="Animal">Animal</option>
          <option value="Art">Art</option>
          <option value="Crypto">Crypto</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      <div className='mt-5 ml-5 text-4xl'>
        <h1>Your blog here...</h1>
      </div>
      <div className='editor w-[700px] mt-5 ml-5 mb-5'>
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event,editor)=>{
            const data=editor.getData()
            settext(data);
            setcontent(parse(text).props.children);
          }}
          />
      </div>
      <div className='mt-2.5'>
        <button 
          className='ml-[635px] inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          onClick={Postdata}
        >Post</button>
      </div>
    </div>
  </>
  )
}

export default Write