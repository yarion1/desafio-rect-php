import React, { useEffect, useState } from "react";
import Modal from "../components/modalcat";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const IMG_API = "https://image.tmdb.org/t/p/w1280";
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=28fc78eea970fa433833c4906daa8357&language=pt-BR&page=1";

const FilmCatLog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);

  const location = useNavigate();

  

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  useEffect(() => {
    axios.get('http://localhost/projetophp+react/desafio-php/api/getfilms.php').then(res=>{setMovies(res.data)});
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
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
      <header> <button onClick={()=>{location("/viewFilms")}} className="btncat">Voltar</button></header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <div key={index} className="movie">
              <img
                src={
                  movie.imagem
                    ? IMG_API + movie.imagem
                    : "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbbc/bp-film-review-index.jpg"
                }
                alt={movie.titulo}
              />
              <div className="movie-info">
                <h3>{movie.titulo}</h3>
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

export default FilmCatLog;
