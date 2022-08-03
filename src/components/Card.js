import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, card, onCardLike,onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__button-delete ${isOwn ? 'element__button-delete_active' : ''}`
  ); 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
  );

  function handleClick() {
    onCardClick(card.name, card.link);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img className="element__place-img" src={card.link} alt={card.name} onClick={handleClick} />
      <h3 className="element__title">{card.name}</h3>
      <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
      <div className="element__button-like-number">{card.likes.length}</div>
  </li>
  );
}

export default Card;