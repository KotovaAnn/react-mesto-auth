import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_open-picture ${(isOpen) && "popup_opened"}`}>
      <div className="popup__conteiner">
        <img className="popup__picture" src={card.link} alt={card.title} />
        <p className="popup__title-picture">{card.title}</p>
        <button className="button popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;