import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc,  // doc
  onSnapshot,//return real time data
  query, where,//query 
  orderBy, serverTimestamp, // order the database 
  updateDoc
} from 'firebase/firestore';

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const imageRef = collection(db,collectionName);
    const q = query(imageRef,orderBy('createdAt'))
    const unsub =  onSnapshot(q,(snapshot)=>{ // similiar to getDocs but this return real time data more pratical
      let books =[];
      snapshot.docs.forEach(doc=>{
        books.push({...doc.data(), id: doc.id })
      })
      setDocs(books)
    });
    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collectionName]);

  return { docs };
}

export default useFirestore;