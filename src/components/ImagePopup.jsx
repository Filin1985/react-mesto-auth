import React from 'react'
import Popup from './Popup'

const ImagePopup = ({card, onClose, name}) => {
  return (
    <Popup isOpen={card?.link} item={card} onClose={onClose} name={name}>
      <img className='popup__photo' src={card?.link} alt={card?.name} />
      <figcaption className='popup__caption'>{card?.name}</figcaption>
    </Popup>
  )
}

export default ImagePopup
