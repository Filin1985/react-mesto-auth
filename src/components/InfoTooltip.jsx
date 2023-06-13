import React, {useEffect} from 'react'

const InfoTooltip = ({type, onClose}) => {
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
        type
          ? 'popup popup_opacity_less popup_opened'
          : 'popup popup_opacity_less'
      }
      id='popup-tooltip'
      onMouseDown={handleOverlayClose}
    >
      <figure className='popup__tooltip'>
        <button
          aria-label='Close'
          className='button button_type_close'
          type='button'
          onClick={onClose}
        ></button>
        <img className='popup__icon' />
        <figcaption className='popup__paragraph'>{type}</figcaption>
      </figure>
    </section>
  )
}

export default InfoTooltip
