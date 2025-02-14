import React from 'react';
import { useSelector } from 'react-redux';
import { toggleLang } from '../Store/Store';

export default function About() {
  const{content} = useSelector(state => state.lang);

  return (
    <div className='container p-5 border border-1 border-info  rounded-5 my-5 fs-5 fw-bolder shadow-lg'>
      <p>{content.about}</p>
    </div>
  )
}
