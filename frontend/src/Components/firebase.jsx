// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDxe9BWjZecMMQ-5PF2hC-Z3LbN_WXLlI",
  authDomain: "musicrec-9c203.firebaseapp.com",
  projectId: "musicrec-9c203",
  storageBucket: "musicrec-9c203.appspot.com",
  messagingSenderId: "139394024637",
  appId: "1:139394024637:web:aee79c0eee6dcbf57f23d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
