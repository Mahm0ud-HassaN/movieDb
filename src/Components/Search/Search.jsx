import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css'; // Import the CSS file for custom styles

export default function Search() {
  const [query, setQuery] = useState(''); // Search query state
  const [results, setResults] = useState([]); // Search results state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [searchType, setSearchType] = useState('movie'); // Search type state (movie, tv, or person)
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch search results
  async function fetchSearchResults(page = 1) {
    if (!query) return; // Don't fetch if query is empty
    setIsLoading(true); // Show spinner
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${searchType}?api_key=b8917120dc20c4f0df99bfec48318df9&query=${query}&page=${page}`
      );
      setResults(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false); // Hide spinner
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search type change
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search type changes
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Fetch results when query, searchType, or currentPage changes
  useEffect(() => {
    fetchSearchResults(currentPage);
  }, [query, searchType, currentPage]);

  return (
    <>
      <div className="container mt-5">
        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder={`Search for ${searchType === 'person' ? 'people' : searchType + 's'}...`}
              value={query}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
              <option value="person">People</option>
            </select>
          </div>
        </div>

        {/* Spinner */}
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && query && (
          <>
            <div className="row g-3">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <div className="col-md-4 col-lg-3 col-sm-6" key={index}>
                    <div className="card h-100 movie-card">
                      {searchType !== 'person' && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                          className="card-img-top"
                          alt={result.title || result.name}
                        />
                      )}
                      {searchType === 'person' && result.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                          className="card-img-top"
                          alt={result.name}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{result.title || result.name}</h5>
                        {searchType !== 'person' && (
                          <p className="card-text">Rating: {result.vote_average?.toFixed(1)}</p>
                        )}
                      </div>
                      <div className="card-overlay px-5">
                        <div className="overlay-content">
                          {searchType !== 'person' && (
                            <p className="overlay-text">Rating: {result.vote_average?.toFixed(1)} ⭐</p>
                          )}
                          <button className="btn btn-outline-light my-2 w-100">
                            <i className="fa fa-heart"></i> Add to Favorites
                          </button>
                          {searchType !== 'person' && (
                            <Link
                              to={`/${searchType}/${result.id}`}
                              className="btn btn-outline-light mt-2 w-100"
                            >
                              View Details
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No results found.</p>
              )}
            </div>

            {/* Pagination */}
            {results.length > 0 && (
              <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
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
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
}
