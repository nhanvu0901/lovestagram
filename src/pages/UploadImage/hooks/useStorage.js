import { useState, useEffect } from 'react';

import {
 collection,
  addDoc,   // doc
 //return real time data
  serverTimestamp, // order the database 

} from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from '../firebase/config';
import { storage } from '../firebase/config';


const useStorage = (file,text) => {
  const [progress, setProgress] = useState(0);

  const [imageUrl, setUrl] = useState(null);

    // references

   useEffect(()=>{
    const metadata = {
      contentType: 'image/jpeg/gif/png'
    };
      const storageRef = ref(storage,file.name);
    const uploadTask = uploadBytesResumable(storageRef, file,metadata);
    const imageRef = collection(db,'images');
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setProgress(progress);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          console.log(" User doesn't have permission to access the object")
          break;
        case 'storage/canceled':
          console.log(" User canceled the upload")
          break;
        case 'storage/unknown':
          console.log("Unknown error occurred, inspect error.serverResponse")
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUrl(downloadURL);
        addDoc(imageRef,{
          url:downloadURL,
          name:file.name,
          note:text,
          createdAt: serverTimestamp()
        });  
      });
    },
  );
 },[file])
  
  return { progress, imageUrl};
}

export default useStorage;