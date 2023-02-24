import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
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
  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
  }

  const closeAllPopups = () => {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  };

  return (
    <div>
      <Header />
      <Main
        onCardClick={handleCardClick}
        onDeleteCardClick={handleDeleteCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        popup_type={'popup_profile'}
        name={'edit-profile'}
        title={'Редактировать профиль'}
        button_text={'Сохранить'}
        markup={
          <>
            <input
              id="name-input"
              name="name-input"
              className="popup__field popup__field_name"
              type="text"
              required
              minLength="2"
              maxLength="40"
            />
            <span id="name-input-error" className="popup__span"></span>
            <input
              id="job-input"
              name="job-input"
              className="popup__field popup__field_job"
              type="text"
              required
              minLength="2"
              maxLength="200"
            />
            <span id="job-input-error" className="popup__span"></span>
          </>
        }
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
      />
      <PopupWithForm
        popup_type={'popup_card'}
        name={'add-card'}
        title={'Новое место'}
        additional_class={'popup__submit_disabled'}
        button_text={'Создать'}
        markup={
          <>
            <input
              id="title-input"
              name="title-input"
              className="popup__field popup__field_title"
              type="text"
              placeholder='Название'
              required minLength="2"
              maxLength="30"
            />
            <span id="title-input-error" className="popup__span popup__input-error">
            </span>
            <input
              id="url-input"
              name="url-input"
              className="popup__field popup__field_url"
              type="url"
              placeholder='Ссылка на картинку'
              required
            />
            <span id="url-input-error" className="popup__span popup__input-error">
            </span>
          </>
        }
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
      />
      <PopupWithForm
        popup_type={'popup_avatar'}
        name={'edit-avatar'}
        title={'Обновить аватар'}
        additional_class={'popup__submit_disabled'}
        button_text={'Сохранить'}
        markup={
          <>
            <input
              id="avatar-url-input"
              name="avatar-url-input"
              className="popup__field popup__field_url"
              type="url"
              placeholder='Ссылка на картинку'
              required
            />
            <span id="avatar-url-input-error" className="popup__span popup__input-error">
            </span>
          </>
        }
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
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
  );
}

export default App;
