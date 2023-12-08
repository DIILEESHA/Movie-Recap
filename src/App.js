import "./App.css";
import Header from "./component/Header/Header";
import Movie from "./component/movie/Movie";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import Trending from "./component/trending/Trending";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Home />
    </div>
  );
}

export default App;
