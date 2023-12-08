// const apiKey = "f9d26affa6d3bd80057602fdde544c98";

// LatestTrailers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const Trending = () => {
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
    <div>
      <h2>Latest Trailers</h2>
      {latestMovies.map((movie) => (
        <div key={movie.id} className="trailer-card">
          <h3>{movie.title}</h3>
          <button onClick={() => openModal(movie)}>Watch Trailer</button>
        </div>
      ))}

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

export default Trending;
