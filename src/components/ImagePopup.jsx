import React from 'react'
import Popup from './Popup'

const ImagePopup = ({card, onClose}) => {
  return (
    <Popup item={card} onClose={onClose}>
      <img className='popup__photo' src={card.link} alt={card.name} />
      <figcaption className='popup__caption'>{card.name}</figcaption>
    </Popup>
  )
}

export default ImagePopup
