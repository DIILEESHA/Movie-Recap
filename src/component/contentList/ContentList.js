// ContentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactPaginate from "react-paginate";
import "../allmovie/allmovie.css";
import { Link } from "react-router-dom";

const ContentList = ({ contentType, titleProperty }) => {
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${contentType}/list?api_key=${apiKey}&language=en-US`
      );

      setGenres(response.data.genres);
    };

    fetchGenres();
  }, [contentType]);

  useEffect(() => {
    const fetchContent = async () => {
      const apiKey = "f9d26affa6d3bd80057602fdde544c98";

      let url = `https://api.themoviedb.org/3/discover/${contentType}?api_key=${apiKey}&language=en-US&page=${currentPage}`;

      if (selectedGenre) {
        const selectedGenreObject = genres.find(
          (genre) => genre.name === selectedGenre
        );
        if (selectedGenreObject) {
          url += `&with_genres=${selectedGenreObject.id}`;
        }
      }

      const response = await axios.get(url);

      setContent(response.data.results);
      setTotalPages(response.data.total_pages);
    };

    fetchContent();
  }, [selectedGenre, genres, currentPage, contentType]);

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
        <h2 className="desire2">explore {contentType}</h2>

        <Dropdown
          controlClassName="my-dropdown-control"
          menuClassName="my-dropdown-menu"
          // styles={customStyles}
          className="dr"
          options={genres.map((genre) => ({
            value: genre.name,
            label: genre.name,
          }))}
          onChange={handleGenreChange}
          value={selectedGenre}
          placeholder={`Select ${contentType} Genre`}
        />
      </div>

      <div className="moviekit_card">
        {content.map((contentItem) => (
          <Link
            className="linka"
            to={`/${contentType}/${contentItem.id}`}
            key={contentItem.id}
          >
            <div className="movie_sub_card">
              <div className="movie_sub_image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${contentItem.poster_path}`}
                  alt=""
                />

                <div className="fg">
                  <CircularProgressbar
                    className="dega"
                    value={contentItem?.vote_average * 10}
                    text={`${contentItem?.vote_average?.toFixed(1)}`}
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
                <h3 className="content_title">
                  {contentItem[titleProperty]?.slice(0, 15)}
                  {"..."}
                </h3>
                <h5 className="date">
                  {dayjs(contentItem.release_date).format("MMMM D, YYYY")}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        initialPage={0}
      />
    </div>
  );
};

export default ContentList;
