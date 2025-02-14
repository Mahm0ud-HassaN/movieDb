import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import "./MovieDetails.css"; 
import { useSelector } from "react-redux";
import {toggleLang} from '../Store/Store'// Correct the CSS file path

export default function MovieDetails() {
   const { content } = useSelector((state) => state.lang);
  const location = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      try {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=b8917120dc20c4f0df99bfec48318df9`
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setIsLoading(false);
    }

    async function getRelatedMovies() {
      try {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=b8917120dc20c4f0df99bfec48318df9`
        );
        setRelatedMovies(data.results);
      } catch (error) {
        console.error("Error fetching related movies:", error);
      }
    }

    getMovieDetails();
    getRelatedMovies();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      ) : (
        movie && (
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="img-fluid"
                  alt={movie.title}
                />
              </div>
              <div className="col-md-8">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Rating: </strong> 
                  <span className="badge border border-info rounded-0"> {movie.vote_average.toFixed(1)} ⭐</span>
                </p>
                <p>
                  <strong>Adult:</strong> <span className="badge border border-info rounded-0">{movie.adult ? "Yes" : "No"}</span>
                </p>
              </div>
            </div>
            <h3 className="my-4 w-100 border border-info rounded shadow-lg py-2 text-light text-center">Related Movies</h3>
            <div className="row g-3">
              {relatedMovies.length > 0 &&
                relatedMovies.map((relatedMovie, index) => (
                  <div className="col-md-4 col-lg-3 col-sm-6" key={index}>
                    <div className="card h-100 movie-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
                        className="card-img-top"
                        alt={relatedMovie.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{relatedMovie.title}</h5>
                        <p className="card-text">
                          Rating: {relatedMovie.vote_average.toFixed(1)}
                        </p>
                      </div>
                      <div className="card-overlay px-5">
                        <div className="overlay-content">
                          <p className="overlay-text">
                            Rating: {relatedMovie.vote_average.toFixed(1)} ⭐
                          </p>
                          <button className="btn btn-outline-light my-2 w-100">
                            <i className="fa fa-heart"></i> {content.addToFavorites}
                          </button>
                          <Link
                            to={`/movie/${relatedMovie.id}`}
                            className="btn btn-outline-info"
                          >
                            {content.viewDetails}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
