import React,{ useEffect,useState } from 'react'
import {db} from "../firebaseConfig"
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import Box from '../layout/box';
import Searchbar from '../layout/searchbar'
import Head from 'next/head'

const Read = () => {
  const [details,setdetails]=useState([])
  const [click,setclick]=useState(false);
  const userData=async()=>{
    const q = query(collection(db, "write"));

    const querySnapshot = await getDocs(q);
    const data=querySnapshot.docs.map((doc) =>({
      ...doc.data(),
      id:doc.id,
      contents:doc.data().contents
    }));
    setdetails(data);
  }
  const clicked=()=>{
    setclick((prev)=!prev)
    addDoc(collection(db,"write"),{
      Like:click,
    })
    .then(()=>{
      alert("You Liked Post")
    }).catch((err)=>{
      alert("We are Working On it.")
    })
  }
  if(details===[]){
    alert("No Content to display");
  }
  useEffect(() => {
    userData();
  }, [])
  return (
    <>  
          <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
         </Head>
          <div className='text-purple-800 mt-3 ml-3 mb-2'>
            <h1 className='text-3xl'>Recent Posts</h1>
          </div>
            <hr/>
            <div className="text-2xl flex flex-row mb-2">
                <Searchbar placeholder="Enter your Category..." data={details} />
            </div>
    <div className='mr-2 text-black mb-2'>
    { 
      details.map((val)=>
      (
        <div className='flex flex-col'>
          <h3 className='text-xl mt-3 ml-3 text-purple-900'><span className='text-xl text-gray-800'>Topic : </span> {val.categorys}</h3>
          <div className='flex'>
            <h3 className='text-xl mt-3 ml-3 text-purple-800'><span className='text-xl text-gray-800'>Posts[ </span>{val.contents} ]</h3>
            {click===false?<span class="material-symbols-outlined cursor-pointer mt-3 ml-3 hover:text-yellow" onClick={clicked}>
                    thumb_up
            </span>:<span class="material-symbols-outlined">
                thumb_down
            </span>}
          </div>
        </div>
      ))
    }
    </div>
  </>
  )
}

export default Read;