import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { AiOutlineAlignLeft } from "react-icons/ai"; 
import {
   deleteDoc, doc,  // doc
} from 'firebase/firestore'
import { ref, deleteObject } from "firebase/storage";
import { db ,storage } from '../firebase/config';
import { useEffect ,useState} from 'react';
const ImageGrid = ({ setSelectedImg,setOpenNoteModal,setSelectedText }) => {
  const { docs } = useFirestore('images');
  const [imageID,setImage] = useState(null);
  const iconMotion = {
    rest: {
      y: "-100vh",
     opacity:0,
     zindex:99999,
     transition: {
      
      type: "tween",
      ease: "easeOut"
    }
    },
    hover: {
      y: 0,
      opacity:99999,
      zindex:99999,
      transition: {
        duration: 0.01,
        type: "tween",
        ease: "easeOut"
      }
    }
  }
  const iconMotionNote = {
    x:'-100px',
    rest: {
     opacity:0,
     zindex:99999,
     transition: {
      duration: 0.0001,
      type: "tween",
      ease: "easeOut"
    }
    },
    hover: {
      x:0,
      opacity:99999,
      zindex:99999,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }
  const imageHover ={
    rest:{
      rotateY:0,
      opacity: 0.8
    },
    hover:{
      rotateY:180,
      opacity: 1
    }
  }
  useEffect(() => {
    
  },[imageID,setImage]);

  const DeleteImage = (e)=>{
    e.preventDefault();
   
    const imgID = e.currentTarget.getAttribute("data-id");
    const imgName = e.currentTarget.getAttribute("data-name");
    const desertRef = ref(storage, imgName);
    if(imgID ){
      const docRef = doc(db,'images',imgID)
      deleteObject(desertRef);
      deleteDoc(docRef)
      .then(()=>{
        console.log("Delete successfull");
        setImage(null);
      })
    }
    
  }
  const openModalNote = (e)=>{
    e.preventDefault();
    const imgNote = e.currentTarget.getAttribute("data-note");//currentTarget khac gi -->tim hieu di
    const imgID = e.currentTarget.getAttribute("data-id");
    console.log(imgNote);
    if(imgNote){
      setOpenNoteModal(true);
      setSelectedText({imgNote,imgID});
    }
  }
  
  return (
    <div className="img-grid" >
      {docs && docs.map(doc => (
        
        <motion.div className="img-wrap" key ={doc.id}
          layout
          variants={imageHover}
          initial="rest" whileHover="hover" animate="rest"
        >
          <motion.img   id ='imageId' src={doc.url} alt="uploaded pic" onClick={()=>setSelectedImg(doc.url)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />

          <motion.div variants={iconMotion}  className='imageDelete'>
            <IoClose   
            data-id={doc.id}
            data-name={doc.name}
            
            size={40}
            onClick={DeleteImage}
            />
           </motion.div>

           <svg width="1em" height="1em">
            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop stopColor="#67e6d1" offset="0%" />
              <stop stopColor="#6789e6" offset="100%" />
            </linearGradient>
          </svg>
  
           <motion.div variants={iconMotionNote} className='noteOpen' >
             <AiOutlineAlignLeft 
             onClick={openModalNote}
             data-note={doc.note}
             data-id={doc.id}
             style={{ fill: "url(#blue-gradient)" }}
             size={40}/>
            </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;