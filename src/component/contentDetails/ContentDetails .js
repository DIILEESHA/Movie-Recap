// ContentDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ActorList from "../cast/ActorList ";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const ContentDetails = () => {
  const { contentId, contentType } = useParams();
  const [contentDetails, setContentDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

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
        setCast(response.data.credits.cast.slice(0, 5)); // Adjust the number of top cast members as needed
      }
      if (contentType === "tv" && response.data.number_of_seasons) {
        setContentDetails({
          ...contentDetails,
          number_of_seasons: response.data.number_of_seasons,
          number_of_episodes: response.data.number_of_episodes,
        });
      }
    };

    fetchContentDetails();
  }, [contentId, contentType]);

  if (!contentDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
    </div>
  );
};

export default ContentDetails;
