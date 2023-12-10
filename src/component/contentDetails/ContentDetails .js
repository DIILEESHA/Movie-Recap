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
  console.log('Rendering PlayButton');
  const loading = useLoading();

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const randomImg = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      // Fetch content details
      const response = await axios.get(
        `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}&language=en-US&append_to_response=credits`
      );

      // Set content details
      setContentDetails(response.data);

      // Set background image
      setBackgroundImage(
        `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`
      );
    };

    randomImg();
  }, [contentId, contentType]);

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
    <div className="contentdetail_container">
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

      {!loading && contentDetails && (
        <>
          <div className="top_main">
            <div className="hj">
              <img
                src={`https://image.tmdb.org/t/p/w500/${contentDetails?.poster_path}`}
                alt={contentDetails?.title || contentDetails?.name}
              />

              <div className="main_content">
                <div className="content_left">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
                    alt={contentDetails.title || contentDetails.name}
                  />
                </div>
                <div className="content_right">
                  <h1 className="contenth1">
                    {contentDetails.title || contentDetails.name}
                  </h1>
                  <p>
                    Released Date:{" "}
                    {contentDetails.release_date ||
                      contentDetails.first_air_date}
                  </p>

                  <div className="show_trailor_option">
                    {trailerKey && (
                      <div>
                        <a href="https://cdnl.iconscout.com/lottie/free/thumb/free-youtube-logo-4396402-3645718.mp4"></a>
                        <div style={{color:'red',zIndex:'1'}} className="playbtn" onClick={openModal}>
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="80px"
                            height="80px"
                            viewBox="0 0 213.7 213.7"
                            enableBackground="new 0 0 213.7 213.7"
                            xmlSpace="preserve"
                          >
                            <polygon
                              className="triangle"
                              fill="none"
                              strokeWidth="7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              points="73.5,62.5 148.5,105.8 73.5,149.1"
                            ></polygon>
                            <circle
                              className="circle"
                              fill="none"
                              strokeWidth="7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              cx="106.8"
                              cy="106.8"
                              r="103.3"
                            ></circle>
                          </svg>
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>
                    )}

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
                  </div>

                  <p>Runtime: {contentDetails.runtime} minutes</p>
                  <p>Overview: {contentDetails.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <ActorList cast={cast} />
            <p>Director: {director}</p>
            {contentType === "tv" && (
              <>
                <p>Number of Seasons: {contentDetails.number_of_seasons}</p>
                <p>Number of Episodes: {contentDetails.number_of_episodes}</p>
              </>
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
          </div>
        </>
      )}
    </div>
  );
};

export default ContentDetails;
