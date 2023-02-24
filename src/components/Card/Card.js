import React from "react";

function Card({card, onCardClick, onDeleteCardClick, myId}) {

  const isLiked = card.likes.some(user => user._id === myId);

  return (
      <div className="element">
        <img className="element__mask-group" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
        <div className="element__text-like">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button className={`element__like ${isLiked ? 'element__like_active' : ''}`} type="button"></button>
            <p className="element__like-counter">{card.likes.length > 0 ? card.likes.length : ''}</p>
          </div>
          {card.owner._id === myId ?
            <button className="element__trash" type="button" onClick={() => onDeleteCardClick(card)}></button> : null
          }
        </div>
      </div>
  );
}

export default Card;
