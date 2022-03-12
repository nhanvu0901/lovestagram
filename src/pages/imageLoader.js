
import React, { useState } from 'react';
import Title from './UploadImage/comps/Title';
import UploadForm from './UploadImage/comps/UploadForm';
import ImageGrid from './UploadImage/comps/ImageGrid'
import Modal from './UploadImage/comps/Modal';
import './style/ImageStyle.css'
import UploadModal from './UploadImage/comps/UploadModal';
import NoteModal from './UploadImage/comps/NoteModal';
const ImageLoader = () => {
  const [selectedImg,setSelectedImg] = useState(null);
  const [openModal,setOpenModal] =useState(null);
  const [openNoteModal,setOpenNoteModal] =useState(null);
  const [selectedText,setSelectedText] = useState({imgNote:'',imgID:''});
  return (
    <div className="App"
      style={{
        minHeight: '100vh',
        height:'100%',
        backgroundColor:'#d1dcde',
        width:'100%'
      }}
    >
      <Title/>
      <UploadForm setOpenModal={setOpenModal} />
      <ImageGrid setSelectedImg={setSelectedImg} setOpenNoteModal={setOpenNoteModal} setSelectedText={setSelectedText}/>
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      {openModal && (<UploadModal setOpenModal={setOpenModal}/>)}
      {openNoteModal && (<NoteModal setOpenNoteModal={setOpenNoteModal} selectedText={selectedText}/>)}
    </div>
  );
};
  
export default ImageLoader;