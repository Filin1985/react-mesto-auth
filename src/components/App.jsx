import React, {useState, useEffect} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfileForm from './EditProfileForm'
import EditAvatarForm from './EditAvatarForm'
import NewPlaceForm from './NewPlaceForm'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import Loader from './Loader'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import {api} from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CardContext} from '../contexts/CardContext'
import {Route, Routes} from 'react-router-dom'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmForm, setIsConfirmForm] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState()
  const [cardId, setCardId] = useState('')
  const [cards, setCards] = useState([])

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        {!currentUser && <Loader />}
        {currentUser && (
          <div className='page'>
            <Header />
            <Routes path='/mesto-react'>
              <Route path='/signup' element={<Register />} />
              <Route path='/signin' element={<Login />} />
              <Route
                path='/'
                element={
                  <ProtectedRoute
                    element={
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onConfirm={handleConfirmClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                    }
                  />
                }
              />
            </Routes>
            {/* <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onConfirm={handleConfirmClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            /> */}
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
          </div>
        )}
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
