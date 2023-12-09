// TVShows.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactPaginate from "react-paginate";

// ... (imports)

// ... (imports)

const TvShows = () => {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );

      setGenres(response.data.genres);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      let url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=${currentPage}`;

      if (selectedGenre) {
        const selectedGenreObject = genres.find(
          (genre) => genre.name === selectedGenre
        );
        if (selectedGenreObject) {
          url += `&with_genres=${selectedGenreObject.id}`;
        }
      }

      const response = await axios.get(url);

      setMovie(response.data.results);
      setTotalPages(response.data.total_pages);
    };

    fetchMovies();
  }, [selectedGenre, genres, currentPage]);

  const handleGenreChange = (selected) => {
    setSelectedGenre(selected.value);
    setCurrentPage(1); // Reset to the first page when changing the genre
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="movies_container">
      <div className="movie_end">
        <h2 className="desire">explore movies</h2>

        <Dropdown
          className="dr"
          options={genres.map((genre) => ({
            value: genre.name,
            label: genre.name,
          }))}
          onChange={handleGenreChange}
          value={selectedGenre}
          placeholder="Select Genre"
        />
      </div>

      <div className="moviekit_card">
        {movie.map((movieItem) => (
          <div className="movie_sub_card" key={movieItem.id}>
            <div className="movie_sub_image">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`}
                alt=""
              />

              <div className="fg">
                <CircularProgressbar
                  className="dega"
                  value={movieItem.vote_average * 10}
                  text={`${movieItem.vote_average.toFixed(1)}`}
                  styles={buildStyles({
                    width: "50px",
                    textColor: "#fff",
                    trailColor: "#d6d6d6",
                    textSize: "30px",
                  })}
                />
              </div>
            </div>
            <div className="sub-card">
              <h3 className="movie_title">
                {movieItem?.name?.slice(0, 15)}
                {"..."}
              </h3>
              <h5 className="date">
                {dayjs(movieItem.release_date).format("MMMM D, YYYY")}
              </h5>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        initialPage={0} // Set the initial page to 0
      />
    </div>
  );
};

export default TvShows;
