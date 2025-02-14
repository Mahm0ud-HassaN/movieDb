import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLang, toggleTheme } from '../Store/Store'; // Correct the import path
import './Navbar.css';
import egy from './egypt.png';
import eng from './england.png';
import moon from './moon.png';
import sun from './sun.png';

export default function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { content, lang } = useSelector((state) => state.lang);

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light px-4">
        <Link className="navbar-brand" to="/home">
          {content.Cinima}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                {content.home}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {content.About}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                {content.register}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                {content.login}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fav">
                {content.favorites} 💛
              </Link>
            </li>
          </ul>
          <button className="btn btn-lang mx-2 btn-outline-info" onClick={() => dispatch(toggleLang())}>
            {lang === 'ar' ? (
              <img src={egy} alt="Egypt Flag" width={50} height={40} />
            ) : (
              <img src={eng} alt="UK Flag"width={50} height={40} />
            )}
          </button>
          <button className="btn btn-theme mx-2 btn-outline-info" onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? (
              <img src={moon} alt="Sun Icon" width={50} height={40}/>
            ) : (
              <img src={sun} alt="Moon Icon"width={50} height={40} />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
