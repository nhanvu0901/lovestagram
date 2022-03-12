

import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  

export const NavLink = styled(Link)`
color: #fff;
font-size: 20px;
font-weight: 500;
transition: 0.5s;
text-decoration: none;
padding: 10px 20px;
&:hover {
  transform: scale(1.1);
  background-color: #ffff;
  border-radius: 10px;
  color: #212529;
  
}
`;
  

  
export const NavBtnLink = styled(Link)`
  // border-radius: 4px;
  // background: #808080;
  // padding: 10px 22px;
  // color: #000000;
  // outline: none;
  // border: none;
  // cursor: pointer;
  // transition: all 0.2s ease-in-out;
  // text-decoration: none;
  // /* Second Nav */
  // margin-left: 24px;
  // &:hover {
  //   transition: all 0.2s ease-in-out;
  //   background: #fff;
  //   color: #808080;
  // }
`;