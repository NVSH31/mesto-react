import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import DeletePlacePopup from '../DeletePlacePopup/DeletePlacePopup';
import api from '../../utils/api';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

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
  const [deletedCard, setDeletedCard] = React.useState(null);

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

  const handleCardDelete = (deletedCard) => {
    setDeletedCard(deletedCard);
    setIsDeleteCardPopupOpen(true);
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

    console.log('Before true isLoading = ', isLoading);
    setIsLoading(true); // not work
    console.log('After true isLoading = ', isLoading);

    api.editMe(inputData.name, inputData.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(
        setIsLoading(false)
      );

      console.log('after false isLoading = ', isLoading);
  }

  const handleUpdateAvatar = (inputData) => {
    setIsLoading(true);
    api.editAvatar(inputData.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(
        setIsLoading(false)
      );
  }

  const handleAddPlaceSubmit = (inputData) => {
    setIsLoading(true);
    api.addCard(inputData.name, inputData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(
        setIsLoading(false)
      );
  }

  const handleDeletePlaceSubmit = (card) => {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(Error => console.log(Error))
      .finally(
        setIsLoading(false)
      );
  }

  const closeAllPopups = () => {
    setSelectedCard(null);
    setDeletedCard(null);
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
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <DeletePlacePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeletePlace={handleDeletePlaceSubmit}
          card={deletedCard}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
