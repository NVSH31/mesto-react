import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({
  onClose, isOpen, onAddPlace
}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
          popup_type={'popup_card'}
          name={'add-card'}
          title={'Новое место'}
          // additional_class={'popup__submit_disabled'}
          button_text={'Создать'}
          onClose={onClose}
          isOpen={isOpen}
          onSubmit={handleSubmit}
        >
          <input
            id="title-input"
            name="title-input"
            className="popup__field popup__field_title"
            type="text"
            placeholder='Название'
            required minLength="2"
            maxLength="30"
            onChange={handleChangeName}
            value={name}
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
            onChange={handleChangeLink}
            value={link}
          />
          <span id="url-input-error" className="popup__span popup__input-error">
          </span>
        </PopupWithForm>
  );
}
