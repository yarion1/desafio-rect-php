import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import FilmCatLog from "./pages/FilmCatlog";

function App() {
  
  return (
    <>
      <Router>
        
          <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/viewFilms" element={<Movie/>} />
                <Route path="/catlogFilm" element={<FilmCatLog/>} />

          </Routes>
          
      </Router>
    </>
  );
}

export default App;
