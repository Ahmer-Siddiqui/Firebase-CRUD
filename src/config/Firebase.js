import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwIgFkxj5-ZJLKal_haMuZ9TEq6P3nCVI",
  authDomain: "fir-practice-4367c.firebaseapp.com",
  projectId: "fir-practice-4367c",
  storageBucket: "fir-practice-4367c.appspot.com",
  messagingSenderId: "312568479761",
  appId: "1:312568479761:web:2eb4131ac4fa388c2ff1b0",
  measurementId: "G-Z3MC0HK6WS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;