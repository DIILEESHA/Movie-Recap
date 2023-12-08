import React, { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";

const Header = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const randomImg = async () => {
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
    randomImg();
  }, []);

  return (
    <div
      className="header_container"
      //   style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
              <input type="text" placeholder="Search for a Movie or Tv show..." />

              <div className="search_button">
                <button>search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
