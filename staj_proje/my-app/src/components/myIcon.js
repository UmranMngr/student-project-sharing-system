// src/components/MyIcon.js
import React from 'react';
import { ReactComponent as BookShelfIcon } from '../assets/bookshelf-svgrepo-com (1).svg';
import './myIcon.css';


const MyIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center' ,justifyContent:'center'}}>
    <BookShelfIcon  className='myIconn'/>
  </div>
);

export default MyIcon;

