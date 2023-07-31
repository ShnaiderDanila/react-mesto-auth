class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Универсальный метод обработки ответа от сервера
   * @private
   * @param {object} res объект response с сервера
   * @returns {(json|string)} json с данными сервера или строку с ошибкой с сервера
   */
  _renderServerResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
  }

  /**
  * Универсальный метод запроса с проверкой ответа
  * @private
  * @param {string} url эндпоинт следующий за базовым URL
  * @param {object} options объект настроек HTTP запроса
  * @returns {(json|string)} json с данными сервера или строка с ошибкой с сервера
  */
  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options)
      .then(res => {
        return this._renderServerResponce(res)
      })
  }

  /**
   * Метод загрузки информации о пользователе с сервера
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  getUserInfo() {
    return this._request(`users/me`, {
      headers: this._headers
    })
  }

  /**
   * Метод загрузки карточек с сервера
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  getInitialCards() {
    return this._request(`cards`, {
      headers: this._headers
    })
  }

  /**
   * Метод получения общей информации (метода 1 и метода 2)
   * @return {Promise} возвращает подтвержденный промис двух методов this.getInitialCards и this.getUserInfo
   */
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  /**
   * Метод редактирования профиля на сервере
   * @param {string} name имя пользователя страницы
   * @param {string} about доп. информация о пользователе страницы
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  editProfile(name, about) {
    return this._request(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  /**
   * Метод добавления новой карточки на сервер
   * @param {string} name заголовок карточки
   * @param {string} link ссылка на картинку карточки
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  addCard(name, link) {
    return this._request(`cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  /**
  * Метод удаления карточки с сервера
  * @param {string} cardId свойство _id внутри объекта card
  * @return {function} возвращает результат работы this._request с переданными аргументами   
  */
  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  /**
  * Метод изменения состояния лайка на сервере
  * @param {string} cardId свойство _id внутри объекта card
  * @param {boolean} isLiked состояние лайка карточки true или false
  * @returns {function} возвращает результат работы метода removeLike и setLike, в зависмости от состояния лайка карточки  
  */
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId)
    } else {
      return this.setLike(cardId)
    }
  }

  /**
   * Метод постановки лайка на сервере
   * @param {string} cardId свойство _id внутри объекта card
   * @returns {function} возвращает результат работы this._request с переданными аргументами 
   */
  setLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }


  /**
   * Метод снятия лайка на сервере
   * @param {string} cardId свойство _id внутри объекта card
   * @returns {function} возвращает результат работы this._request с переданными аргументами 
   */
  removeLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  /**
  * Метод обновление аватара пользователя на сервере
  * @param {string} avatar ссылка на картинку-аватар пользователя
  * @returns {function} возвращает результат работы this._request с переданными аргументами 
  */
  updateAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  /**
   * Метод регистрации пользователя
   * @param {string} email email пользователя из инпута формы
   * @param {string} password пароль пользователя из инпута формы
   * @returns {function} возвращает результат работы this._request с переданными аргументами 
   */
  register(email, password) {
    return this._request(`signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
  }

  /**
   * Метод авторизации пользователя
   * @param {string} email email пользователя из инпута формы
   * @param {string} password пароль пользователя из инпута формы
   * @returns {function} возвращает результат работы this._request с переданными аргументами 
   */
  authorize(email, password) {
    return this._request(`signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          return res
        }
      })
  }

/**
 * Метод сравнения токена клиента с токеном на сервере
 * @param {string} token token в браузере пользователя
 * @returns {function} возвращает результат работы this._request с переданными аргументами 
 */
  checkToken(token) {
    return this._request(`users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '354e8aec-b975-496d-b856-6d5457e3b39e',
    'Content-Type': 'application/json'
  }
});

const authApi = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api, authApi };


