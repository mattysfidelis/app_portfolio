import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAtqialDWT0uvoQ4MKZXY-hiH73izfcNrk",
  authDomain: "portfolio-17a2a.firebaseapp.com",
  projectId: "portfolio-17a2a",
  storageBucket: "portfolio-17a2a.appspot.com",
  messagingSenderId: "907567965134",
  appId: "1:907567965134:web:5d5a5f33f4773c5636819f"
  });
  
  const db = firebase.firestore();

  export {db};