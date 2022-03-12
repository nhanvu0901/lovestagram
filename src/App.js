
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/index'
import ImageLoader from './pages/imageLoader';
import Contact from './pages/contact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/imageLoader" element={<ImageLoader/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
        </Routes>
    </Router>
    
  );
}
  
export default App;
