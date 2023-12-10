import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "../movie/Movie";
import LatestTrailers from "../latest/LatestTrailers";
import Header from "../Header/Header";
import ContentDetails from "../contentDetails/ContentDetails ";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [latestMovies, setLatestMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const totalPages = 100;
      // Fetch popular movies
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const promises = Array.from({ length: totalPages }, (_, page) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${
            page + 1
          }`
        )
      );

      const responses = await Promise.all(promises);

      const allPopularMovies = responses.reduce(
        (accumulator, response) => accumulator.concat(response.data.results),
        []
      );

      setPopularMovies(allPopularMovies);
    };

    const fetchTrendingMovies = async () => {
      // Fetch popular movies
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
      );
      setTrendingMovies(response.data.results);
    };
    const fetchLatestMovies = async () => {
      // Fetch latest movies
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );
      setLatestMovies(response.data.results);
    };

    const fetchRandomBackdrop = async () => {
      // Fetch a random backdrop image
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const randomMovie =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`
      );
    };
    fetchTrendingMovies();
    fetchPopularMovies();
    fetchLatestMovies();
    fetchRandomBackdrop();
  }, []);

  return (
    <div
      className="home-container"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white", 
      }}
    >
      <Header />
      <Movie title="Trending Movies" movies={trendingMovies} contentType="movie" />
      <LatestTrailers />
      <Movie title="Popular Movies" movies={popularMovies} contentType="movie" />
    </div>
  );
};

export default Home;
