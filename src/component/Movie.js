// MovieList.js
import React from "react";

const Movie = ({ title, movies }) => (
  <div>
    <h2>{title}</h2>
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            style={{ height: "50px" }}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="sub-card">
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>IMDb: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Movie;
