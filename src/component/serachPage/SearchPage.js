import React from "react";
import { useLocation } from "react-router-dom";
import SearchResults from "../searchresult/SearchResults";

const SearchPage = () => {
  const location = useLocation();
  const searchResults = location.state ? location.state.results : [];


  if(!searchResults){
    <div>
      loading
    </div>
  }

  return (
    <div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchPage;
