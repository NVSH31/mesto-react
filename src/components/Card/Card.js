import React from "react";
import api from "../../utils/api";

function Card({card, onCardClick, onDeleteCardClick, myId}) {

  const [likes, setLikes] = React.useState([]);


  function getLikeStatus() {
    if (likes.find(user => user._id === myId)) {
      return true;
    } else {
      return false;
    }
  }

  function toggleLike() {
    if (getLikeStatus()) {
      api.deleteLike(card._id)
        .then(card => {
          setLikes(card.likes);
        })
        .catch(Error => console.log(Error));
    } else {
      api.addLike(card._id)
        .then(card => {
          setLikes(card.likes);
        })
        .catch(Error => console.log(Error));
    }

  }

  React.useEffect(() => {
    setLikes(card.likes);
    getLikeStatus();
  }, []);

  return (
    <li className="elements__item">
      <div className="element">
        <img className="element__mask-group" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
        <div className="element__text-like">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button className={`element__like ${getLikeStatus() && 'element__like_active'}`} onClick={toggleLike} type="button"></button>
            <p className="element__like-counter">{likes.length > 0 ? likes.length : ''}</p>
          </div>
          {/* ИСПРАВИТЬ ПРОВЕРКУ */}
          {card.owner._id !== myId ?
            <button className="element__trash" type="button" onClick={() => onDeleteCardClick(card)}></button> : null
          }
        </div>
      </div>
    </li>
  );
}

export default Card;
