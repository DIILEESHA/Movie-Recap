import dayjs from "dayjs";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

const SearchResults = ({ results, titleProperty }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleNavigate = (id, type) => {
    // Navigate to a specific page based on the type (movie or tv show)
    navigate(`/${type}/${id}`);
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
      <div className="moviekit_card">
        {results.map((result) => (
          <button
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            className="linka"
            onClick={() => handleNavigate(result.id, result.media_type)}
          >
            <div className="movie_sub_card">
              <div className="movie_sub_image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt=""
                />
              </div>
              <div
                className="sub-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <h3 className="content_title">
                  {/* {result?.title === "tv" ? result?.title?.slice(0, 15) : result.name.slice(0, 15)} */}
                  <h3 className="content_title">
                    {result.media_type === "tv"
                      ? result.title?.slice(0, 15)
                      : result.name?.slice(0, 15)}
                  </h3>

                  {/* {result.name || result?.title.slice(0,15)} */}
                </h3>
                <h5 className="date">
                  {dayjs(result.release_date).format("MMMM D, YYYY")}
                </h5>
              </div>
            </div>
          </button>
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
        initialPage={0}
      />
    </div>
  );
};

export default SearchResults;
