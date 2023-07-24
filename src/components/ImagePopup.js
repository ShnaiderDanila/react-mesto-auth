function ImagePopup({onClose, card}) {
  return (
    <div className={`popup popup-picture ${card.name && card.link ? 'popup_is-opened' : ''}`}>
      <figure className="popup__figure">
        <button onClick={onClose} className="popup__button-close" type="button"></button>
        <img className="popup__big-image" src={card.link} alt={card.name}/>
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup