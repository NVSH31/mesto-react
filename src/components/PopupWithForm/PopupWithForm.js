import React from "react";

function PopupWithForm({
  popupType,
  name,
  title,
  additionalClass,
  buttonText,
  buttonLoadingText,
  onClose,
  isOpen,
  children,
  onSubmit,
  inputsValid,
  isLoading
}) {
  return (
    <section className={`popup ${popupType} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className={`popup__submit ${!inputsValid && additionalClass}`}>
            { isLoading ? buttonLoadingText : buttonText }
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
