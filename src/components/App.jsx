import React, {useState, useEffect} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfileForm from './EditProfileForm'
import EditAvatarForm from './EditAvatarForm'
import NewPlaceForm from './NewPlaceForm'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import InfoTooltip from './InfoTooltip'
import Loader from './Loader'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import {api} from '../utils/Api'
import {auth} from '../utils/Auth'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CardContext} from '../contexts/CardContext'
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmForm, setIsConfirmForm] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState()
  const [userEmail, setUserEmail] = useState('')
  const [cardId, setCardId] = useState('')
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(null)
  const [tooltip, setTooltip] = useState({
    text: '',
    type: '',
  })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    api
      .getUserProfile()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((error) => {
        console.log(error)
      })
    api
      .getAllCards()
      .then((res) => {
        setCards(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const checkUser = () => {
    auth
      .checkUser()
      .then((res) => {
        if (!res.data) {
          return
        }
        console.log(res.data)
        setUserEmail(res.data.email)
        setLoggedIn(true)
        navigate(location.pathname)
      })
      .catch((error) => {
        console.log(error)
        setLoggedIn(false)
      })
  }

  useEffect(() => {
    checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleConfirmClick = () => {
    setIsConfirmForm(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const closeAllPopups = () => {
    setTooltip({
      text: '',
      type: '',
    })
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmForm(false)
    setSelectedCard(null)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id)
    if (isLiked) {
      api
        .removeLikeFromCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      api
        .addLikeToCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleDeleteApprove = (e) => {
    e.preventDefault()
    api
      .deleteCard(cardId)
      .then((res) => {
        setCards((state) => state.filter((card) => card._id !== cardId))
        setIsConfirmForm(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleCardDelete = (cardId) => {
    setIsConfirmForm(true)
    setCardId(cardId)
  }

  const handleUpdateUser = ({name, about}) => {
    api
      .saveProfileData(name, about)
      .then((res) => {
        setCurrentUser(res)
        setIsEditProfilePopupOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleUpdateAvatar = ({avatar}) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        setIsEditAvatarPopupOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    api
      .addNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards])
        setIsAddPlacePopupOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUserEmail('')
  }

  console.log(loggedIn)
  if (loggedIn === null) {
    return <Loader />
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className='page'>
          <Header email={userEmail} onLogout={handleLogout} />
          <Routes>
            <Route
              path='/'
              element={
                loggedIn ? (
                  <Navigate to='/mesto-react' replace />
                ) : (
                  <Navigate to='/sign-in' replace />
                )
              }
            />
            <Route
              path='/sign-up'
              element={<Register setTooltip={setTooltip} />}
            />
            <Route
              path='/sign-in'
              element={
                <Login setTooltip={setTooltip} handleLogin={handleLogin} />
              }
            />
            <Route
              path='/mesto-react'
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onConfirm={handleConfirmClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  element={Main}
                />
              }
            />
          </Routes>
          <Footer />

          <EditProfileForm
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarForm
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <NewPlaceForm
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddNewCard={handleAddPlaceSubmit}
          />

          {isConfirmForm && (
            <PopupWithForm
              name='confirm'
              title='Вы уверены?'
              onClose={closeAllPopups}
              buttonText='Да'
              onSubmit={handleDeleteApprove}
            />
          )}

          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}
          {tooltip.type && (
            <InfoTooltip tooltip={tooltip} onClose={closeAllPopups} />
          )}
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
