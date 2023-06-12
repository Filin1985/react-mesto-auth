import React, { useEffect } from 'react'

const ImagePopup = ({ card, onClose }) => {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscClose)
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [onClose])

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
  return (
    <section
      className={
        card
          ? 'popup popup_opacity_less popup_opened'
          : 'popup popup_opacity_less'
      }
      id='popup-image'
      onMouseDown={handleOverlayClose}
    >
      <figure className='popup__image'>
        <button
          aria-label='Close'
          className='button button_type_close'
          type='button'
          onClick={onClose}
        ></button>
        <img className='popup__photo' src={card.link} alt={card.name} />
        <figcaption className='popup__caption'>{card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup
