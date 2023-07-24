import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDeleteCard }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="alert"
      title="Вы уверены"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmPopup