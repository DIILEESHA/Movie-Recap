// LatestTrailers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./latest.css";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

const LatestTrailers = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );
      setLatestMovies(response.data.results);
    };

    fetchLatestMovies();
  }, []);

  const fetchTrailer = async (movieId) => {
    const apiKey = "f9d26affa6d3bd80057602fdde544c98";

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    );

    const trailers = response.data.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailers.length > 0 ? trailers[0].key : null;
  };

  const openModal = async (movie) => {
    const trailerKey = await fetchTrailer(movie.id);
    setSelectedTrailer({ title: movie.title, key: trailerKey });
  };

  const closeModal = () => {
    setSelectedTrailer(null);
  };

  return (
    <div className="trailor_container">
      <h2>Latest Trailers</h2>
      <div className="trailor">
        {latestMovies.map((movie) => (
          <div key={movie.id} className="trailer-card">
            <button onClick={() => openModal(movie)}>
              <div className="trail">
                <img
                  style={{ height: "" }}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="player">
                  <FaPlay className="play_icon"/>
                </div>
              </div>
              <h3 className="sm">
                {movie.title.slice(0, 10)}
                {"..."}
              </h3>
            </button>
          </div>
        ))}
      </div>
      {selectedTrailer && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${selectedTrailer.key}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestTrailers;
