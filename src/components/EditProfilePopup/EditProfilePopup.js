import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


export default function EditProfilePopup({
  isOpen, onClose, onUpdateUser
}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeJob = (evt) => {
    setDescription(evt.target.value);
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      popup_type={'popup_profile'}
      name={'edit-profile'}
      title={'Редактировать профиль'}
      button_text={'Сохранить'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        name="name-input"
        className="popup__field popup__field_name"
        type="text"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name}
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
        onChange={handleChangeJob}
        value={description}
      />
      <span id="job-input-error" className="popup__span"></span>
    </PopupWithForm>
  );
}

