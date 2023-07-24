import { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onTrashClick, onCardLike, cards }) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-button" type="button">
          <img className="profile__avatar-image" alt="Аватарка пользователя" src={currentUser.avatar} />
          <div className="profile__avatar-overlay"></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button onClick={onEditProfile} className="profile__button-edit" type="button"></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} className="profile__button-add" type="button"></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onTrashClick={onTrashClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;