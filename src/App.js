import "./App.css";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Allmovie from "./component/allmovie/Allmovie";
import TvShows from "./component/tvshow/TVShows";
import ContentList from "./component/contentList/ContentList";
import ContentDetails from "./component/contentDetails/ContentDetails ";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movie"
            element={<ContentList contentType="movie" titleProperty="title" />}
          />
          <Route
            path="/tv-shows"
            element={<ContentList contentType="tv" titleProperty="name" />}
          />
          {/* <Route exact path="/:contentType" component={ContentList} /> */}
          <Route
            exact
            path="/:contentType/:contentId"
            component={ContentDetails}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
