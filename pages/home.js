import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { collection, query, getDocs, addDoc, deleteDoc,doc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import Head from 'next/head';

const Home = () => {
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
  if(details===[]){
    alert("No Content to display");
  }
  useEffect(() => {
    userData();
  }, [])
  const router=useRouter();
  const writing=()=>{
    router.push('/write')
  }
  const signed=()=>{
    router.push('/register')
  }
  const getId=async(id)=>{
    await deleteDoc(doc(db,"write",id)).then(()=>{
      // alert("Deleted.")
    }).catch((err)=>{
      alert("Our fault we are workin on it.")
    })
    router.reload('/home')
  }
  const Id=(id)=>{
    setclick((prev)=>!prev)
    addDoc(collection(db,"write"),{
      Task:click,
    })
    .then(()=>{
      alert("You Completed your task hurray!!!(You should delete it.)")
    }).catch((err)=>{
      alert("We are Working On it.")
    })
  }
  return (
    <div>
      <nav class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div className="container-fluid flex justify-between">
          <a className="text-xl text-black font-semibold" href="#">PenDiaries</a>
          <button 
            className='mr-4 ml-72 md:ml-52 lg:ml-[1000px] hover:text-gray-900'
            onClick={signed}
            >Sign in
          </button>
        </div>
      </div>
      </nav>
      <div className='mt-0 ml-0 mr-0 flex m-2 hover:divide-solid bg-gradient-to-r from-sky-500 to-fuchsia-700'>
        <div className='flex flex-1 flex-col'> 
          <h1 className='mt-10 text-[90px] font-semibold font-sans ml-3'>Simple ToDo WebApp
          <div className='flex mb-4 mt-4 pt-14'>
            <button 
              className="inline-block px-6 py-2.5 bg-purple-900 text-white font-medium text-xs leading-tight uppercase rounded-[20px] shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out mr-4"
              onClick={writing}
              >Add your ToDo Task here</button>
          </div>
          </h1>
        </div>
      </div>
      <div className='mb-10' key={Math.floor(Math.random()*1000000)}>
        <h3 className='text-3xl text-gray-800 h-10 ml-3'>Your Tasks...</h3>
            <hr/>
        <div className='mr-2 text-black mb-2' >
          { 
      details.map((val)=>
      (
        <div className='flex flex-col'>
          <h3 className='text-xl mt-3 ml-3 text-purple-900 font-serif'>🦓{val.categorys}</h3>
          <div className='flex'>
            <h3 className='text-xl mt-3 ml-3 text-purple-800 font-sans'>🐾[ {val.contents} ]</h3>
            <button 
              onClick={()=>Id(val.id)}
              className=" inline-block px-2 py-2 ml-5 mr-5 bg-purple-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >🎊Completed ?</button>
            <button 
              className="inline-block px-2 py-2 bg-purple-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={()=>getId(val.id)}>Delete</button>
          </div>
        </div>
      ))
    }
    </div>
      </div>
      <footer class="text-center lg:text-left bg-gray-100 text-gray-600">
        <div class="text-center p-2 bg-gray-200">
          <span>© 2021 Copyright:</span>
          <a class="text-gray-600 font-semibold" href="https://tailwind-elements.com/">Pen Diaries</a>
        </div>
    </footer>
    </div>
  )
}

export default Home