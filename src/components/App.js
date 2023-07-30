import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api, authApi } from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Register from './Register';
import Login from './Login';
import Footer from "./Footer";
import PopupWithValidation from './PopupWithValidation';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import ConfirmPopup from './ConfirmPopup'
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from './ProtectedRoute';

function App() {

  // Стейт-переменные для открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // Стейт-переменная состояния попапа infoTooltip
  const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(false);

  // Стейт-переменная загрузки попапа
  const [isLoading, setIsLoading] = useState(false);

  // Стейт-переменная выбранной карты (данные для ImagePopup)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  // Стейт-переменная выбранной карты, для последующего удаления через ConfirmPopup
  const [cardForDelete, setCardForDelete] = useState({});

  // Стейт-переменная текущего пользователя страницы
  const [currentUser, setCurrentUser] = useState({});

  // Стейт-переменная текущего email-адреса пользователя страницы
  const [userEmail, setUserEmail] = useState('');

  // Стейт-переменная карточек на странице
  const [cards, setCards] = useState([]);

  // Стейт-переменная авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Функция проверки токена при загрузки страницы
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }, [navigate])

  // Проверка токена
  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  // Получение с сервера данных пользователя страницы и начальных карточек 
  useEffect(() => {
    if (loggedIn) {
      api.getAppInfo()
        .then(([initialCards, userInfo]) => {
          setCurrentUser(userInfo)
          setCards(initialCards)
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn])

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
    isInfoTooltipOpen && setIsInfoTooltipOpen(false);
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
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          userEmail={userEmail} />
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/" element=
            {<ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onTrashClick={handleTrashClick} />} />
          <Route path="/sign-up" element={<Register
            setIsInfoTooltipOpen={setIsInfoTooltipOpen}
            setInfoTooltipSuccess={setInfoTooltipSuccess} />} />
          <Route path="/sign-in" element={<Login
            setLoggedIn={setLoggedIn}
            setIsInfoTooltipOpen={setIsInfoTooltipOpen}
            setInfoTooltipSuccess={setInfoTooltipSuccess} />} />
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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          infoTooltipSuccess={infoTooltipSuccess}
        />
      </CurrentUserContext.Provider>
    </div>

  )
};

export default App;


