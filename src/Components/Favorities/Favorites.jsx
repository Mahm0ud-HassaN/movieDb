import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from '../Store/Store'; // Adjust the import path accordingly

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorite); // Adjusted the path

  const handleRemoveFavorite = (movie) => {
    dispatch(removeFromFavorites(movie));
  };

  return (
    <div className="container mt-5">
      <h2>Your Favorite Movies</h2>
      <div className="row">
        {favorites.length === 0 ? (
          <div className="col-12">
            <p>No favorite movies added yet!</p>
          </div>
        ) : (
          favorites.map((movie) => (
            <div className="col-md-4 col-lg-3 col-sm-6" key={movie.id}>
              <div className="card h-100">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  className="card-img-top" 
                  alt={movie.title} 
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <button className="btn btn-danger" onClick={() => handleRemoveFavorite(movie)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
