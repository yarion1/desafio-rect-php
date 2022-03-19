import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=28fc78eea970fa433833c4906daa8357&language=pt-BR&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=28fc78eea970fa433833c4906daa8357&language=pt-BR&query=";

const Movie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useNavigate();
  

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const detailMovie = (movie) => {
    setSelectedMovie(movie);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    console.log(selectMovie);
  }, [selectMovie]);

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
        <button  onClick={()=>{location("/catlogfilm")}} className="btncat">Filmes Catalogados</button>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <div key={index} className="movie">
              <img
                src={
                  movie.poster_path
                    ? IMG_API + movie.poster_path
                    : "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbbc/bp-film-review-index.jpg"
                }
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
              </div>

              <div className="movie-over">
                <button
                  className="moreview"
                  onClick={() => {
                    detailMovie(movie);
                  }}
                >
                  ver mais
                </button>
              </div>
            </div>
          ))}
      </div>

      <Modal openModal={isOpen} data={selectMovie} />
    </>
  );
};

export default Movie;
