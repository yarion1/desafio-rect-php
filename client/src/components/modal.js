import React, { useEffect, useState } from "react";
import "./Modal.css";
import propTypes from "prop-types";
import axios from "axios";

function Modal({ openModal, data }) {
  const [show, toggleShow] = useState(openModal);
  const [selectedMovie, setSelectedMovie] = useState(data);

  useEffect(() => {
    toggleShow(openModal);
  }, [openModal]);
  useEffect(() => {
    console.log(show);
  }, [show]);
  useEffect(() => {
    setSelectedMovie(data);
    console.log(data);
  }, [data]);

  const addCatalog = (selectedMovie) => {
    console.log(selectedMovie);

    const passData = new URLSearchParams();
    passData.append('imagem',String(
      selectedMovie.poster_path
        ? `https://image.tmdb.org/t/p/w1280${selectedMovie.poster_path}`
        : "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbbc/bp-film-review-index.jpg"
    ))
    passData.append('titulo',String(selectedMovie.title))
    passData.append('descricao',String(selectedMovie.overview))
    passData.append('lancamento',String(selectedMovie.release_date))
    
    // Envia uma requisição post
    axios(
      {method: "POST", url:"http://localhost/projetophp+react/desafio-php/api/catlogfilms.php", data:passData})
      .then( (response)=> {
        console.log(passData)
        console.log(response);
        toggleShow(!show);
        alert('filme catalogado!');
        
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      {show === true ? (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                style={{ color: "Red" }}
                onClick={() => {
                  toggleShow(!show);
                }}
              >
                X
              </button>
            </div>
            <div className="modal_img">
              <img
                src={
                  selectedMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${selectedMovie.poster_path}`
                    : "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbbc/bp-film-review-index.jpg"
                }
                alt={selectedMovie.title}
                className="modal_img"
              />
            </div>
            <div className="title_modal">
              <h1>{selectedMovie.title}</h1>
            </div>
            <div className="overviewmModal">
              <p>{selectedMovie.overview}</p>
            </div>
            <div className="realeaseDate">
              <span>Data de lancamento: {selectedMovie.release_date}</span>
            </div>
            <div className="footer">
              <button
                onClick={() => {
                  addCatalog(selectedMovie);
                }}
              >
                Catalogar Filme
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
Modal.defaultProps = {
  data: {},
  openModal: false,
};
Modal.propTypes = {
  openModal: propTypes.bool.isRequired,
  data: propTypes.object.isRequired,
};

export default Modal;
