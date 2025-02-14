import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for custom styles
import Search from '../Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLang, toggleTheme, removeFromFavorites, addToFavorites } from '../Store/Store'; // Adjusted the import path
import { Helmet } from "react-helmet";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const theme = useSelector((state) => state.theme.theme); // Get the current theme from the reducer
  const { content } = useSelector((state) => state.lang); // Get the current language content from the reducer
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorite);

  const handleFavoriteToggle = (movie) => {
    const isFavorite = favorites && favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(movie));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  async function getData(page = 1) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=b8917120dc20c4f0df99bfec48318df9&page=${page}`
      );
      setMovies(data.results);
      setTotalPages(data.total_pages); // Update total pages
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={`home-container ${theme}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Search />
      <div className="container mt-5">
        <h2 className='text-center border-bottom shadow-sm py-2 my-4'>{content.trendingMovies}</h2>
        <div className="row g-3">
          {movies.length > 0 &&
            movies.map((movie, index) => {
              const isFavorite = favorites && favorites.some((fav) => fav.id === movie.id);
              return (
                <div className="col-md-4 col-lg-3 col-sm-6" key={index}>
                  <div className="card h-100 movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="card-img-top"
                      alt={movie.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{content.rating}: {movie.vote_average.toFixed(1)}</p>
                    </div>
                    <div className="card-overlay px-5">
                      <div className="overlay-content">
                        <p className="overlay-text">{content.rating}: {movie.vote_average.toFixed(1)} ⭐</p>
                        <button className="btn btn-outline-light my-2 w-100" onClick={() => handleFavoriteToggle(movie)}>
                          <i className="fa fa-heart"></i> {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                        <Link to={`/movie/${movie.id}`} className="btn btn-outline-light mt-2 w-100">
                          {content.viewDetails}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {content.previous}
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)) // Show 5 pages at a time
              .map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {content.next}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
