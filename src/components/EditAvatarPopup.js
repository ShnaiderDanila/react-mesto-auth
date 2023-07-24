import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar, isValid, errorMessage, handleChangeValidation, resetValidation }) {
  
  const avatar = useRef();

  useEffect(() => {
    if (isOpen) {
      avatar.current.value = "";
      resetValidation();
    }
  }, [isOpen, resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      isValidForm={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          id="avatar"
          className={`popup__input ${errorMessage.avatar && 'popup__input_invalid'}`}
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          ref={avatar}
          onChange={handleChangeValidation}
          required />
        <span
          id="error-avatar"
          className={`popup__input-error ${errorMessage.avatar && 'popup__input-error_active'}`}>
          {errorMessage.avatar}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup