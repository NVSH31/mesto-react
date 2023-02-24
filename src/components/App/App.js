import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWihtForm from '../PopupWithForm/PopupWithForm';


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
    <div className="page">
      <Header />
      <Main
        onCardClick={handleCardClick}
        onDeleteCardClick={handleDeleteCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWihtForm
        popup_type={
          (isEditProfilePopupOpen && 'popup_profile') ||
          (isAddPlacePopupOpen && 'popup_card') ||
          (isEditAvatarPopupOpen && 'popup_avatar') ||
          (isDeleteCardPopupOpen && 'popup_delete') || null
        }
        name={
          (isEditProfilePopupOpen && 'edit-profile') ||
          (isAddPlacePopupOpen && 'add-card') ||
          (isEditAvatarPopupOpen && 'edit-avatar') ||
          (isDeleteCardPopupOpen && 'delete-card') || null
        }
        title={
          (isEditProfilePopupOpen && 'Редактировать профиль') ||
          (isAddPlacePopupOpen && 'Новое место') ||
          (isEditAvatarPopupOpen && 'Обновить аватар') ||
          (isDeleteCardPopupOpen && 'Вы уверены?') || null
        }
        additional_class={
          (isAddPlacePopupOpen && 'popup__submit_disabled') ||
          (isEditAvatarPopupOpen && 'popup__submit_disabled') ||
          (isDeleteCardPopupOpen && 'popup__submit_delete') || null
        }
        button_text={
          (isEditProfilePopupOpen && 'Сохранить') ||
          (isAddPlacePopupOpen && 'Создать') ||
          (isEditAvatarPopupOpen && 'Сохранить') ||
          (isDeleteCardPopupOpen && 'Да') || null
        }
        markup={
          (isEditProfilePopupOpen &&
            <>
              <input
                id="name-input"
                name="name-input"
                className="popup__field popup__field_name"
                type="text"
                required
                minLength="2"
                maxLength="40"
                defaultValue={document.querySelector('.profile__name').textContent}
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
                defaultValue={document.querySelector('.profile__job').textContent}
              />
              <span id="job-input-error" className="popup__span"></span>
            </>
          ) ||
          (isAddPlacePopupOpen &&
            <>
              <input id="title-input" name="title-input" className="popup__field popup__field_title" type="text"
                placeholder='Название' required minLength="2" maxLength="30" />
              <span id="title-input-error" className="popup__span popup__input-error">
              </span>
              <input id="url-input" name="url-input" className="popup__field popup__field_url" type="url"
                placeholder='Ссылка на картинку' required />
              <span id="url-input-error" className="popup__span popup__input-error">
              </span>
            </>
          ) ||
          (isEditAvatarPopupOpen &&
            <>
              <input id="avatar-url-input" name="avatar-url-input" className="popup__field popup__field_url" type="url"
                placeholder='Ссылка на картинку' required />
              <span id="avatar-url-input-error" className="popup__span popup__input-error">
              </span>
            </>
          ) || null
        }
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeleteCardPopupOpen}
      />
    </div>
  );
}

export default App;
