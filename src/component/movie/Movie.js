// MovieList.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./movie.css";
import dayjs from "dayjs";

const Movie = ({ title, movies }) => (
  <div className="movie_container">
    <h2>{title}</h2>
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <div className="gas">
            <img
              style={{ height: "" }}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="fg">
              <CircularProgressbar
                className="dega"
                value={movie.vote_average * 10}
                text={`${movie.vote_average.toFixed(1)}%`}
                styles={buildStyles({
                  width: "50px",
                  textColor: "#fff",
                  trailColor: "#d6d6d6",
                  textSize: "30px",
                  // Set the width of the CircularProgressbar container
                })}
              />
            </div>
          </div>
          <div className="sub-card">
            <h3 className="movie_title">
              {movie.title.slice(0, 15)}
              {"..."}
            </h3>
            <h5 className="date">{dayjs(movie.release_date).format("MMMM D, YYYY")}</h5>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Movie;
