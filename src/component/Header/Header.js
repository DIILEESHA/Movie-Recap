import React, { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";
import { useNavigate } from "react-router-dom";
import SearchResults from "../searchresult/SearchResults";

const Header = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const randomImg = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const totalPages = 10;

      // Create an array of promises for each page
      const promises = Array.from({ length: totalPages }, (_, page) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${
            page + 1
          }`
        )
      );

      // Wait for all promises to resolve
      const responses = await Promise.all(promises);

      // Combine the results from all pages
      const allMovies = responses.reduce(
        (accumulator, response) => accumulator.concat(response.data.results),
        []
      );

      // Select a random movie from the combined results
      const randomMovie =
        allMovies[Math.floor(Math.random() * allMovies.length)];

      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`
      );
    };

    randomImg();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      // If the search query is empty, you can handle this case as needed
      return;
    }

    try {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchQuery}`
      );

      navigate("/search", { state: { results: response.data.results } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="header_container">
      <div className="jy"></div>
      <div className="img_container">
        <img src={`${backgroundImage}`} alt="" />
        <div className="dk">
          <div className="img_details">
            <h1 className="welcome">welcome.</h1>
            <h2 className="welcome_note">
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>

            <div className="seach_content">
              <input
                type="text"
                placeholder="Search for a Movie or Tv show..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="search_button">
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>

            {/* Display search results */}
            {/* <SearchResults results={searchResults} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
