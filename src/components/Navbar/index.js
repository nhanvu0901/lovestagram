import React, { useState, useEffect } from "react";
import {
  NavLink
} from './NavbarElements';
import "./Header.css";
import { CSSTransition } from "react-transition-group";

const Navbar = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [headerAnimation,setHeaderAnimation] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
      
    };

   
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };


  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const windowHeight = ()=>{
    
    
    const height = document.getElementById('root').scrollY;
    if(height>20){
      console.log("Lmao")
    }
}
  return (
    <>
     <header className="Header" onScroll={windowHeight}>
     <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
           <nav className="Nav">
           
              <NavLink to='/home' activeStyle>
                Home
              </NavLink>
              <NavLink to='/imageLoader' activeStyle>
              Image Loader
              </NavLink>
              <NavLink to='/contact' activeStyle>
                Contact
              </NavLink>

            </nav>
        </CSSTransition>
        <button onClick={toggleNav} className="Burger">🍔</button>
      </header>
    </>
  );
};
  
export default Navbar;