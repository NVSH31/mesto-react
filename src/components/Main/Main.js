import React, { useEffect } from 'react';
import Card from '../Card/Card';
import api from '../../utils/api';

let myId = '';

function Main({ onCardClick, onDeleteCardClick, onEditProfile, onAddPlace, onEditAvatar }) {

  const [userName ,setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription ,setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar ,setUserAvatar] = React.useState(null);



  useEffect(() => {
    api.getMe()
      .then(profile => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
        myId = profile._id;
      })
      .catch(Error => console.log(Error));
  }, [userName, userDescription, userAvatar]);


  const [cards, setCards] = React.useState([]);
  useEffect(() => {
    api.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(Error => console.log(Error));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img className="profile__image" src={userAvatar} alt="Аватар" />
          <div className="profile__overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__top-string">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card, i) => {
            return <Card key={i} card={card} onCardClick={onCardClick} onDeleteCardClick={onDeleteCardClick} myId={myId}/>
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
