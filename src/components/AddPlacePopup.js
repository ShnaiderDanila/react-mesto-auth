import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace, isValid, errorMessage, handleChangeValidation, resetValidation }) {

  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      setPlace('');
      setLink('');
      resetValidation();
    }
  }, [isOpen, resetValidation]);

  function handleChangePlace(evt) {
    setPlace(evt.target.value);
    handleChangeValidation(evt);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
    handleChangeValidation(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(place, link);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      buttonLoadingText="Создание..."
      isOpen={isOpen}
      isValidForm={isValid}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          id="place"
          className={`popup__input ${errorMessage.place && 'popup__input_invalid'}`}
          type="text"
          name="place"
          placeholder="Название"
          value={place || ""}
          onChange={handleChangePlace}
          required
          minLength="2"
          maxLength="30" />
        <span
          id="error-place"
          className={`popup__input-error ${errorMessage.place && 'popup__input-error_active'}`}>
          {errorMessage.place}
        </span>
      </label>
      <label className="popup__form-field">
        <input
          id="link"
          className={`popup__input ${errorMessage.link && 'popup__input_invalid'}`}
          type="url"
          name="link"
          value={link || ""}
          onChange={handleChangeLink}
          placeholder="Ссылка на картинку"
          required />
        <span
          id="error-link"
          className={`popup__input-error ${errorMessage.link && 'popup__input-error_active'}`}>
          {errorMessage.link}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup