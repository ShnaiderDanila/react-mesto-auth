import { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithValidation from './PopupWithValidation';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import ConfirmPopup from './ConfirmPopup'
import { api } from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function App() {

  // Стейт-переменные для открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  // Стейт-переменная загрузки попапа
  const [isLoading, setIsLoading] = useState(false);

  // Стейт-переменная выбранной карты (данные для ImagePopup)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  // Стейт-переменная выбранной карты, для последующего удаления через ConfirmPopup
  const [cardForDelete, setCardForDelete] = useState({});

  // Стейт-переменная текущего пользователя страницы
  const [currentUser, setCurrentUser] = useState({});

  // Стейт-переменная карточек на странице
  const [cards, setCards] = useState([]);

  // Получение с сервера данных пользователя страницы и начальных карточек 
  useEffect(() => {
    api.getAppInfo()
      .then(([initialCards, userInfo]) => {
        setCurrentUser(userInfo)
        setCards(initialCards)
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link })
  }

  function handleTrashClick(card) {
    setIsConfirmPopupOpen(true);
    setCardForDelete(card);
  }

  function closeAllPopups() {
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isConfirmPopupOpen && setIsConfirmPopupOpen(false);
    selectedCard && setSelectedCard({ name: '', link: '' });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCardsArray = cards.map(currentCard => currentCard._id === card._id ? newCard : currentCard)
        setCards(newCardsArray);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete() {
    // Отправляем запрос в API на удаление карточки и получаем обновлённый массив
    api.deleteCard(cardForDelete._id)
      .then(() => {
        const newCardsArray = cards.filter(currentCard => currentCard._id !== cardForDelete._id)
        setCards(newCardsArray);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(name, about) {
    // Включаем индикатор загрузки запроса
    setIsLoading(true)
    // Отправляем запрос в API на изменение данных пользователя страницы
    api.editProfile(name, about)
      .then(() => {
        setCurrentUser({ ...currentUser, name: name, about: about })
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      // Выключаем индикатор загрузки запроса
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleUpdateAvatar(avatar) {
    // Включаем индикатор загрузки запроса
    setIsLoading(true)
    // Отправляем запрос в API на обновление аватара пользователя страницы
    api.updateAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar })
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      // Выключаем индикатор загрузки запроса
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleAddPlaceSubmit(name, link) {
    // Включаем индикатор загрузки запроса
    setIsLoading(true)
    // Отправляем запрос в API на добавление новой карточки на страницу
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      // Выключаем индикатор загрузки запроса
      .finally(() => {
        setIsLoading(false)
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header />

        <Routes>
          <Route path="/" element={
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onTrashClick={handleTrashClick}
            />
          } />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
        <Footer />
        <PopupWithValidation
          component={EditProfilePopup}
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithValidation
          component={AddPlacePopup}
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />
        <PopupWithValidation
          component={EditAvatarPopup}
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;


