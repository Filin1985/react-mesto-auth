import React, {useContext} from 'react'
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CardContext} from '../contexts/CardContext'

const Main = ({
  onEditAvatar,
  onEditProfile,
  onCardClick,
  onAddPlace,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext)
  const cards = useContext(CardContext)

  return (
    <>
      {currentUser && (
        <main className='content'>
          <section className='profile section'>
            <div className='profile__image' onClick={onEditAvatar}>
              <img
                className='profile__avatar'
                src={currentUser.avatar}
                alt='Аватар'
              />
            </div>
            <div className='profile__container'>
              <div className='profile__info'>
                <div className='profile__head'>
                  <h1 className='profile__name'>{currentUser.name}</h1>
                  <button
                    aria-label='Edit'
                    className='button button_type_edit'
                    type='button'
                    onClick={onEditProfile}
                  ></button>
                </div>
                <p className='profile__prof'>{currentUser.about}</p>
              </div>
              <button
                className='button button_type_add'
                type='button'
                onClick={onAddPlace}
              ></button>
            </div>
          </section>

          <section className='elements section'>
            <ul className='elements__list'>
              {cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onDeleteClick={onCardDelete}
                />
              ))}
            </ul>
          </section>
        </main>
      )}
    </>
  )
}

export default Main
