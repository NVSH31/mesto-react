import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  onClose,
  isOpen,
  onUpdateAvatar,
}) {

  const [urlAvatar, setUrlAvatar] = React.useState('');
  const urlAvatarRef = React.useRef('');


  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({ avatar: urlAvatarRef.current.value });
  }

  const handleChangeAvatar = (evt) => {
    setUrlAvatar(evt.target.value);
  }

  return (
    <PopupWithForm
      popup_type={'popup_avatar'}
      name={'edit-avatar'}
      title={'Обновить аватар'}
      // additional_class={'popup__submit_disabled'}
      button_text={'Сохранить'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-url-input"
        name="avatar-url-input"
        className="popup__field popup__field_url"
        type="url"
        placeholder='Ссылка на картинку'
        required
        onChange={handleChangeAvatar}
        value={urlAvatar}
        ref={urlAvatarRef}
      />
      <span id="avatar-url-input-error" className="popup__span popup__input-error">
      </span>
    </PopupWithForm>
  );
}
