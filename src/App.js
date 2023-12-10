import "./App.css";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ContentList from "./component/contentList/ContentList";
import ContentDetails from "./component/contentDetails/ContentDetails ";
import SearchPage from "./component/serachPage/SearchPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
        <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Home contentType="movie" />} />
          <Route
            path="/movie"
            element={<ContentList contentType="movie" titleProperty="title" />}
          />
          <Route
            path="/tv-shows"
            element={<ContentList contentType="tv" titleProperty="name" />}
          />
          {/* <Route exact path="/:contentType" component={ContentList} /> */}
          <Route path="/:contentType/:contentId" element={<ContentDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
