// ContentDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ContentDetails = () => {
  const { contentId, contentType } = useParams();
  const [contentDetails, setContentDetails] = useState(null);

  useEffect(() => {
    const fetchContentDetails = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const response = await axios.get(
        `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}&language=en-US`
      );

      setContentDetails(response.data);
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
      <p>Released Date: {contentDetails.release_date || contentDetails.first_air_date}</p>
      <p>Director: {/* Fetch and display director information if available */}</p>
      <p>Top Cast: {/* Fetch and display top cast information if available */}</p>
      <p>Runtime: {contentDetails.runtime} minutes</p>
      <p>Vote Average: {contentDetails.vote_average}/10</p>
      <p>Overview: {contentDetails.overview}</p>
    </div>
  );
};

export default ContentDetails;
