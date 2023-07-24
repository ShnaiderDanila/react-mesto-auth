class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

// Универсальный метод обработки ответа от сервера
  _renderServerResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

// Универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options)
    .then(res => {
      return this._renderServerResponce(res)
    })
  }

// Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    return this._request(`users/me`, {
      headers: this._headers
    })
  }

// Метод загрузки карточек с сервера
  getInitialCards() {
    return this._request(`cards`, {
      headers: this._headers
    })
  }

// Метод получения общей информации (метода 1 и метода 2)
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

// Метод редактирования профиля на сервере
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

// Метод добавления новой карточки на сервер
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
  

  // Метод удаления карточки с сервера
  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  // Метод изменения состояния лайка на сервере
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId)
    } else {
      return this.setLike(cardId)
    }
  }


  // Метод постановки лайка на сервере
  setLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  // Метод снятия лайка на сервере
    removeLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  // Метод обновление аватара пользователя на сервере
  updateAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
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

export { api };


