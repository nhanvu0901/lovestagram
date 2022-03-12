import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, 
 
} from 'firebase/firestore'
import {  getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0o2HriGkbETKWRXbphV6HBurSAIGUrcI",
  authDomain: "firegram-6719c.firebaseapp.com",
  projectId: "firegram-6719c",
  storageBucket: "firegram-6719c.appspot.com",
  messagingSenderId: "372571776843",
  appId: "1:372571776843:web:20c80adf2c92d24f736ace"
};

// Initialize Firebase
// init firebase
const firebaseApp = initializeApp(firebaseConfig);

// init services
const db = getFirestore() // tất cả các phương thức như lữu trữ , add ,delete đều qua firestore 
// collection ref
const storage = getStorage(firebaseApp);


export { db ,storage };