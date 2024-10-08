// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-5cDuhK4hErDReW8XNQmeh54yl_Y_Xf8",
  authDomain: "koiauction-59dc0.firebaseapp.com",
  projectId: "koiauction-59dc0",
  storageBucket: "koiauction-59dc0.appspot.com",
  messagingSenderId: "194621692243",
  appId: "1:194621692243:web:41eab484596d1ccf5ee9a6",
  measurementId: "G-HHZNFHGJED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
