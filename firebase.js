import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
 apiKey: "AIzaSyCeu4_6uA8nHY851c9c9_uKkeFMAqFSyT8",
  authDomain: "payment-95a0f.firebaseapp.com",
  projectId: "payment-95a0f",
  storageBucket: "payment-95a0f.appspot.com",
  messagingSenderId: "574723895889",
  appId: "1:574723895889:web:14175e26d87492c6d6fe70"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
