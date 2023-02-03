// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app"
// import 'firebase/compat/database'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
  // apiKey: "AIzaSyB5Xg-oTlJx3yRFWXezy3e0ghJq2MqMmgw",
  // authDomain: "user-data-control.firebaseapp.com",
  // projectId: "user-data-control",
  // storageBucket: "user-data-control.appspot.com",
  // messagingSenderId: "52131022045",
  // appId: "1:52131022045:web:5e2b07354b05720fc2c734"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// export const database = firebase.database();
// export default database;


import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function startFirebase(){
const firebaseConfig = {
  apiKey: "AIzaSyB5Xg-oTlJx3yRFWXezy3e0ghJq2MqMmgw",
  authDomain: "user-data-control.firebaseapp.com",
  projectId: "user-data-control",
  storageBucket: "user-data-control.appspot.com",
  messagingSenderId: "52131022045",
  appId: "1:52131022045:web:5e2b07354b05720fc2c734"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  return getDatabase(app);
}

export default startFirebase;