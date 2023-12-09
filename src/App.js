import "./App.css";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Allmovie from "./component/allmovie/Allmovie";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Allmovie />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
