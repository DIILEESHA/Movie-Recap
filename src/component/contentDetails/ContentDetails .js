// ContentDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ActorList from "../cast/ActorList ";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ClipLoader from "react-spinners/ClipLoader";
import { CircleLoader } from "react-spinners";
import "./content.css";

import useLoading from "../useloader/useLoading ";
import ReactPlayer from "react-player";



const ContentDetails = () => {
  const { contentId, contentType } = useParams();
  const [contentDetails, setContentDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loading = useLoading();

  useEffect(() => {
    const fetchContentDetails = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const response = await axios.get(
        `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}&language=en-US&append_to_response=credits`
      );

      setContentDetails(response.data);

      // Extract director's name from the crew
      if (
        response.data.credits &&
        response.data.credits.crew &&
        response.data.credits.crew.length > 0
      ) {
        const directors = response.data.credits.crew.filter(
          (member) => member.job === "Director"
        );
        setDirector(directors.length > 0 ? directors[0].name : "");
      }

      // Extract top cast
      if (
        response.data.credits &&
        response.data.credits.cast &&
        response.data.credits.cast.length > 0
      ) {
        setCast(response.data.credits.cast.slice(0, 5));
      }

      // Fetch trailers separately for movies and TV shows
      if (contentType === "movie" || contentType === "tv") {
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/${contentType}/${contentId}/videos?api_key=${apiKey}&language=en-US`
        );

        // Set the trailer key if a video is available
        if (
          videoResponse.data.results &&
          videoResponse.data.results.length > 0
        ) {
          setTrailerKey(videoResponse.data.results[0].key);
        }
      }
    };

    fetchContentDetails();
  }, [contentId, contentType]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader size={100} />
        </div>
      )}

      {!loading && (
        <>
          <h1>{contentDetails.title || contentDetails.name}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
            alt={contentDetails.title || contentDetails.name}
          />
          <p>
            Released Date:{" "}
            {contentDetails.release_date || contentDetails.first_air_date}
          </p>
          <p>Director: {director}</p>
          <ActorList cast={cast} />
          <p>Runtime: {contentDetails.runtime} minutes</p>

          <div className="fgr">
            <CircularProgressbar
              className="dega"
              value={contentDetails.vote_average * 10}
              text={`${contentDetails.vote_average.toFixed(1)}`}
              styles={buildStyles({
                width: "50px",
                textColor: "#fff",
                trailColor: "#d6d6d6",
                textSize: "30px",
              })}
            />
          </div>
          <p>Overview: {contentDetails.overview}</p>

          {contentType === "tv" && (
            <>
              <p>Number of Seasons: {contentDetails.number_of_seasons}</p>
              <p>Number of Episodes: {contentDetails.number_of_episodes}</p>
            </>
          )}

          {trailerKey && (
            <div>
              <button onClick={openModal}>Play Trailer</button>
            </div>
          )}

          {modalOpen && trailerKey && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailerKey}`}
                  controls
                  width="100%"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContentDetails;

