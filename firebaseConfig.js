import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDh6mr4ODfJMVTKDsYMzsLc5_Rki1Rh5Ac",
  authDomain: "pendiaries-6386d.firebaseapp.com",
  projectId: "pendiaries-6386d",
  storageBucket: "pendiaries-6386d.appspot.com",
  messagingSenderId: "313645289891",
  appId: "1:313645289891:web:ecc7083df451db4f4e4a16",
  measurementId: "G-175DJZCLMW"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db } 
