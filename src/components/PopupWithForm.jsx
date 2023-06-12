import React, { useEffect } from 'react'

const PopupWithForm = ({
  onClose,
  title,
  name,
  buttonText,
  children,
  onSubmit,
  isButtonDisable = false,
}) => {
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
      className='popup popup_opened'
      id={`popup-${name}`}
      onMouseDown={handleOverlayClose}
    >
      <div className='popup__container'>
        <button
          aria-label='Close'
          className='button button_type_close'
          type='button'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form
          className='popup__form'
          action='submit'
          name={name}
          onSubmit={onSubmit}
        >
          <fieldset className='popup__set'>
            {children}
            <button
              className={`button button_type_submit ${
                isButtonDisable && 'button_type_submit_disabled'
              }`}
              type='submit'
              disabled={isButtonDisable}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm
