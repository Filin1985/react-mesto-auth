import React, {useEffect} from 'react'

const Popup = ({onClose, children}) => {
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
      className='popup popup_opacity_less popup_opened'
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
        {children}
      </figure>
    </section>
  )
}

export default Popup
