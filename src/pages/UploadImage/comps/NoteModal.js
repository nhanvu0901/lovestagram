import React from 'react'
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { db } from '../firebase/config';
import { doc,updateDoc  } from 'firebase/firestore';
import { useState } from 'react';
const NoteModal = ({setOpenNoteModal,selectedText}) => {
const [success,setSuccess] = useState("");

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenNoteModal(null);
    }
  }
  const onUpdate = (e)=>{
    e.preventDefault();
   const textValue = document.querySelector('.textAreaNote').value;
   const docRef =doc(db,"images",selectedText.imgID);
   updateDoc(docRef,{
     note:textValue,
   })
   .then(()=>{
     alert("Bạn đã cập nhật ghi chú thành cong")
   })
  }
  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
     <motion.div className='noteModal'
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
     >
        <h2>Ghi chú của ảnh</h2>
        <textarea className='textAreaNote'>
          {selectedText.imgNote}
        </textarea>
        
        <input type="submit" className='submitButton' value="Cập nhật ghi chú" onClick={onUpdate}/>
        <IoClose className='closeNoteModal' size={40} onClick={()=>setOpenNoteModal(null)}/>
     </motion.div>
    </motion.div>
  )
}

export default NoteModal