import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyD53fkVSUxQPoGkB8zi_42Iq1jfw3t2eGM",
  authDomain: "lux-ecommerce.firebaseapp.com",
  projectId: "lux-ecommerce",
  storageBucket: "lux-ecommerce.appspot.com",
  messagingSenderId: "85840047185",
  appId: "1:85840047185:web:6be6d21dc05fb5e039dc70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app 