import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLang, toggleTheme } from './Store';

export default function Test() {
  const dispatch = useDispatch();
  

  const theme = useSelector((state) => state.theme.theme);// تعديل هنا للوصول إلى theme
  const { content } = useSelector((state) => state.lang);    // تأكد من الوصول إلى state.lang

  return (
    <>
      <div className="container">
        <button className="btn btn-info" onClick={() => dispatch(toggleLang())}>
          {content.switchTo}
        </button>
        <button onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? content.dark : content.light}
        </button>
        <h1>{content.title}</h1>
        <p>{content.theme}: {theme}</p>
        <h1>{content.home}</h1>
      </div>
    </>
  );
}
