import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import api from '../../utils/api';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getMe(), api.getInitialCards()])
      .then(([profile, cards]) => {
        setCurrentUser(profile);
        setCards(cards);
      })
      .catch(Error => console.log(Error));
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(Error => console.log(Error));
    } else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(Error => console.log(Error));
    }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(Error => console.log(Error));
  }

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleUpdateUser = (inputData) => {
    api.editMe(inputData.name, inputData.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(Error => console.log(Error));
  }

  const handleUpdateAvatar = (inputData) => {
    api.editAvatar(inputData.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(Error => console.log(Error));
  }

  const handleAddPlaceSubmit = (inputData) => {
    api.addCard(inputData.name, inputData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(Error => console.log(Error));
  }



  // const handleDeleteCardClick = (card) => {
  //   setIsDeleteCardPopupOpen(true);
  // }

  const closeAllPopups = () => {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          // onDeleteCardClick={handleDeleteCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          popup_type={'popup_delete'}
          name={'delete-card'}
          title={'Вы уверены?'}
          additional_class={'popup__submit_delete'}
          button_text={'Да'}
          onClose={closeAllPopups}
          isOpen={isDeleteCardPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
