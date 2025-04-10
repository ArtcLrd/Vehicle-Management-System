// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB18CmnyHsv-6a5_FeEmmcSUzi-fzux0kI",
  authDomain: "uaps-test1.firebaseapp.com",
  databaseURL: "https://uaps-test1-default-rtdb.firebaseio.com",
  projectId: "uaps-test1",
  storageBucket: "uaps-test1.appspot.com",
  messagingSenderId: "745219801825",
  appId: "1:745219801825:web:9e215d933c5634e649ada0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };