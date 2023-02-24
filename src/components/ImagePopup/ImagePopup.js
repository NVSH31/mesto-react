import React from "react";

function ImagePopup({ card, onClose }) {

  const handleEscClose = function (evt) {
    console.log('key = ', evt.key);
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  React.useEffect(() => {

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }

  }, []);

  const setListener = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      console.log('close popup');
      onClose();
    }

  }

  return (
    <section
      className={`popup popup_image ${card && 'popup_opened'}`}
      onClick={setListener} onKeyDown={setListener}
    >
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose} ></button>
        <img className="popup__image" src={card? card.link : ''} alt={card ? card.name : ''} />
        <p className="popup__signature">{card ? card.name : ''}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
