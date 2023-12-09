// MovieList.js
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./movie.css";
import dayjs from "dayjs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SkeletonLoader, { SkeletonLoader1 } from "./SkeletonLoader";

const Movie = ({ title, movies }) => {
  const [loading, setLoading] = useState(true);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,

  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 5,
  //       },
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 4,
  //       },
  //     },
  //     {
  //       breakpoint: 892,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //   ],
  // };

  useEffect(() => {
    // Simulate loading delay (replace this with your actual data fetching logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="movie_container">
      <h2 className="desire">{title}</h2>
      <div className="movie-list">
        {loading ? (
          // Show skeleton loader for each card while loading
          Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="movie-card">
              <SkeletonLoader1 />
            </div>
          ))
        ) : (
          <>
            {/* <Slider style={{marginBottom:'30px'}}   {...settings}> */}
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
                      text={`${movie.vote_average.toFixed(1)}`}
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
                  <h5 className="date">
                    {dayjs(movie.release_date).format("MMMM D, YYYY")}
                  </h5>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Movie;
