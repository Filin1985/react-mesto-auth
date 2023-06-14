import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const Card = ({ card, onCardClick, onCardLike, onDeleteClick }) => {
  const { link, likes, name } = card
  const currentUser = useContext(CurrentUserContext)

  const handleClick = () => {
    onCardClick(card)
  }

  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((like) => like._id === currentUser._id)
  const cardLikeButtonClassName = `elements__like ${
    isLiked && 'elements__like_active'
  }`

  return (
    <li className='elements__element'>
      <article>
        <div className='elements__container' onClick={handleClick}>
          <img className='elements__image' src={link} alt={`${name}.`} />
        </div>
        {isOwn && (
          <button
            aria-label='Delete'
            className='elements__delete'
            type='button'
            onClick={() => onDeleteClick(card._id)}
          ></button>
        )}
        <div className='elements__mask'>
          <h2 className='elements__title'>{name}</h2>
          <div className='elements__likes'>
            <button
              aria-label='Like'
              className={cardLikeButtonClassName}
              type='button'
              onClick={() => onCardLike(card)}
            ></button>
            <p className='elements__number'>{likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  )
}

export default Card
