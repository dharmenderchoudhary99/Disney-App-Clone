// import firebase from "firebase"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMwi9E3eHm1BHOMcI4vCxqEhHSmhTroFY",
  authDomain: "disneyplus-clone-ff72d.firebaseapp.com",
  projectId: "disneyplus-clone-ff72d",
  storageBucket: "disneyplus-clone-ff72d.appspot.com",
  messagingSenderId: "759299041591",
  appId: "1:759299041591:web:46cd7ef7ac565c0547d2b2",
  measurementId: "G-5C59PZGVWW",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, storage };
export  default db;

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
