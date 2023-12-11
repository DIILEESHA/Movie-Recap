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

// ... (your imports)

const ContentDetails = () => {
  const { contentId, contentType } = useParams();
  const [contentDetails, setContentDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const loading = useLoading();
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      const response = await axios.get(
        `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}&language=en-US&append_to_response=credits`
      );

      setContentDetails(response.data);
      setBackgroundImage(
        `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`
      );
    };

    fetchData();
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
        setCast(response.data.credits.cast.slice(0, 30));
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

      // Determine content status
      if (response.data.release_date || response.data.first_air_date) {
        const releaseDate = new Date(
          response.data.release_date || response.data.first_air_date
        );
        const currentDate = new Date();

        setStatus(releaseDate <= currentDate ? "Released" : "Not Released");
      } else {
        setStatus("Release date not available");
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
              {contentDetails?.poster_path ? (
                <img className="classic"
                  src={`https://image.tmdb.org/t/p/w500/${contentDetails?.poster_path}`}
                  alt={contentDetails?.title || contentDetails?.name}
                />
              ) : (
                <img
                  src="https://ehelperteam.com/wp-content/uploads/2019/09/Broken-images.png"
                  alt={contentDetails?.title || contentDetails?.name}
                />
              )}

              <div className="main_content">
                <div className="content_left">
                {contentDetails?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${contentDetails?.poster_path}`}
                  alt={contentDetails?.title || contentDetails?.name}
                />
              ) : (
                <img
                  src="https://ehelperteam.com/wp-content/uploads/2019/09/Broken-images.png"
                  alt={contentDetails?.title || contentDetails?.name}

                  style={{opacity:'0.6'}}
                />
              )}
                </div>
                <div className="content_right">
                  <h1 className="contenth1">
                    {contentDetails.title || contentDetails.name}
                  </h1>

                  <div className="show_trailor_option">
                    <div className="fgr">
                      <CircularProgressbar
                        className="degar"
                        value={contentDetails.vote_average * 10}
                        text={`${contentDetails.vote_average.toFixed(1)}`}
                        styles={buildStyles({
                          width: "50px",
                          textColor: "#fff",
                          trailColor: "rgba(0,0,0,0.4)",
                          textSize: "30px",
                        })}
                      />
                    </div>

                    {trailerKey && (
                      <div className="trailord" onClick={openModal}>
                        <svg
                          version="1.1"
                          className="dh"
                          id="play"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          // height="70px"
                          // width="70px"
                          viewBox="0 0 100 100"
                          enableBackground="new 0 0 100 100"
                          xmlSpace="preserve"
                        >
                          <path
                            className="stroke-solid"
                            fill="none"
                            stroke="white"
                            d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                              C97.3,23.7,75.7,2.3,49.9,2.5"
                          />
                          <path
                            className="stroke-dotted"
                            fill="none"
                            stroke="white"
                            d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                                C97.3,23.7,75.7,2.3,49.9,2.5"
                          />
                          <path
                            className="icon"
                            fill="white"
                            d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                          />
                        </svg>

                        <span className="text">Watch Trailer</span>
                      </div>
                    )}
                  </div>

                  <div className="overviewer">
                    <h2 className="overview">overview</h2>
                    <p className="overview_para">{contentDetails.overview}</p>
                  </div>

                  <div className="status_view">
                    <p className="paras">
                      Status:
                      <h3 className="str">{status}</h3>
                    </p>
                  </div>
                  <div className="liner"></div>
                  <p className="paras">
                    Released Date:{" "}
                    <h3 className="str">
                      {contentDetails.release_date ||
                        contentDetails.first_air_date}
                    </h3>
                  </p>
                  <div className="liner"></div>
                  {contentType === "movie" && (
                    <>
                      <p className="paras">
                        Runtime:
                        <h3 className="str">
                          {contentDetails.runtime}
                          minutes
                        </h3>
                      </p>
                      <div className="liner"></div>
                    </>
                  )}

                  {contentType === "tv" && (
                    <>
                      <p className="paras">
                        Number of Seasons:
                        <h3 className="str">
                          {contentDetails.number_of_seasons}
                        </h3>
                      </p>
                      <div className="liner"></div>

                      <p className="paras">
                        Number of Episodes:
                        <h3 className="str">
                          {contentDetails.number_of_episodes}
                        </h3>
                      </p>
                      <div className="liner"></div>
                    </>
                  )}

                  {contentType === "movie" && (
                    <>
                      <p className="paras">
                        Director: <h3 className="str">{director}</h3>
                      </p>
                      <div className="liner"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <ActorList cast={cast} />
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