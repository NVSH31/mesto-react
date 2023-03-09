import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function DeletePlacePopup({
  isOpen,
  onClose,
  onDeletePlace,
  card
}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onDeletePlace(card);
  }

  return (
    <PopupWithForm
      popup_type={'popup_delete'}
      name={'delete-card'}
      title={'Вы уверены?'}
      additional_class={'popup__submit_delete'}
      button_text={'Да'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}
