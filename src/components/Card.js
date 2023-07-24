import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onTrashClick, onCardLike,}) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(item => item._id === currentUser._id);

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleTrashClick() {
    onTrashClick(card)
  }

  return (
    <li className="card">
      <img onClick={handleImageClick} className="card__image" src={card.link} alt={card.name} />
      {isOwn && <button onClick={handleTrashClick} className="card__delete-button" type="button" />}
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            onClick={handleLikeClick}
            className={`card__like-button ${isLiked && 'card__like-button_is-active'}`}
            type="button" />
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card
