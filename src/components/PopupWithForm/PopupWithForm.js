import React from "react";

function PopupWithForm({
  popup_type,
  name,
  title,
  additional_class,
  button_text,
  onClose,
  isOpen,
  children,
  onSubmit
}) {
  return (
    <section className={`popup ${popup_type} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose}></button>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className={`popup__submit ${additional_class}`}>{button_text}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
