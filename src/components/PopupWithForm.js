function PopupWithForm({ isOpen, isValidForm, isLoading, onClose, onSubmit, name, title, buttonText, buttonLoadingText, children }) {
  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <button onClick={onClose} className="popup__button-close" type="button" />
        <form onSubmit={onSubmit} className="popup__form" name={name} noValidate>
          {children}
          <button
            className={isValidForm === false ? 'popup__button-save popup__button-save_invalid' : 'popup__button-save'}
            disabled={isValidForm === false}
            type="submit">
            {isLoading ? buttonLoadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm