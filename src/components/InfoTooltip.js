import React from 'react';
import imageOk from '../images/ok.svg';
import imageError from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_info-tooltip ${(props.isOpen) && "popup_opened"}`}>
      <div className="popup__content">
        <img className="popup__image-info-tooltip" src={(props.registered) ? (imageOk) : (imageError)} alt="картинка"></img>
        <h2 className="popup__title">{(props.registered) ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        <button className="button popup__close-btn popup__close-btn_popup_info-tooltip" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;