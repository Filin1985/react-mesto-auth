import React from 'react'
import usePopupClose from '../hooks/usePopupClose'

const Popup = ({isOpen, onClose, name, children}) => {
  usePopupClose(isOpen, onClose)

  if (!isOpen) return

  const containerClass = name === 'image' ? 'popup__image' : 'popup__container'

  return (
    <section
      className='popup popup_opacity_less popup_opened'
      id={`popup-${name}`}
    >
      <div className={containerClass}>
        <button
          aria-label='Close'
          className='button button_type_close'
          type='button'
          onClick={onClose}
        />
        {children}
      </div>
    </section>
  )
}

export default Popup
