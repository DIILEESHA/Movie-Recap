import "./App.css";
import Header from "./component/Header/Header";
import Movie from "./component/movie/Movie";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import Trending from "./component/trending/Trending";
import LatestTrailers from "./component/latest/LatestTrailers";
import Footer from "./component/footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
