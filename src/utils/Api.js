class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(
      `Возникла ошибка ${res.status} при запросу к ${this._url}`
    )
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserProfile() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    })
  }

  getAllCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    })
  }

  saveProfileData(newName, newProfession) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newProfession,
      }),
    })
  }

  addNewCard(name, link) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  addLikeToCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  removeLikeFromCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  editAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
  }
}

export const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c750cc95-4563-4f0a-9bd8-3b5e3b84a4af',
    'Content-Type': 'application/json',
  },
})
