import React from 'react';
import { useSelector } from 'react-redux';
import { toggleLang } from '../Store/Store';



export default function Footer() {
    const { content } = useSelector((state) => state.lang);
  
  return (
    <div className='text-center p-3 fw-bolder'>
      <p>{content.footer}</p>

    </div>
  )
}
