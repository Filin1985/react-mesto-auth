import React from 'react'
import Popup from './Popup'
import successImage from '../images/success.png'
import errorImage from '../images/error.png'

const InfoTooltip = ({tooltip, onClose}) => {
  const imageType = tooltip.type === 'success' ? successImage : errorImage

  return (
    <Popup onClose={onClose}>
      <div className='popup__box'>
        <img className='popup__icon' src={imageType} alt='Иконка' />
        <figcaption className='popup__paragraph'>{tooltip.text}</figcaption>
      </div>
    </Popup>
  )
}

export default InfoTooltip
