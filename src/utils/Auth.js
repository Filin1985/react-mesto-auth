class Auth {
  constructor({url}) {
    this._url = url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(
      `Возникла ошибка ${res.status} при запросу к ${this._url}`
    )
  }

  registerUser(email, password) {
    console.log(email)
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    }).then(this._checkResponse)
  }

  loginUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    }).then(this._checkResponse)
  }

  checkUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkResponse)
  }
}

export const auth = new Auth({
  url: 'https://auth.nomoreparties.co',
})
