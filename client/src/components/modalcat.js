import React, { useEffect, useState } from "react";
import "./Modal.css";
import propTypes from "prop-types";


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
                  selectedMovie.imagem
                    ? `https://image.tmdb.org/t/p/w1280${selectedMovie.imagem}`
                    : "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbbc/bp-film-review-index.jpg"
                }
                alt={selectedMovie.titulo}
                className="modal_img"
              />
            </div>
            <div className="title_modal">
              <h1>{selectedMovie.titulo}</h1>
            </div>
            <div className="overviewmModal">
              <p>{selectedMovie.descricao}</p>
            </div>
            <div className="realeaseDate">
              <span>Data de lancamento: {selectedMovie.lancamento}</span>
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
