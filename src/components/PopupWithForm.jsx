import React, {useContext} from 'react'
import {PopupContext} from '../contexts/PopupContext'
import Popup from './Popup'
import Form from './ui/Form'

const PopupWithForm = ({
  title,
  name,
  children,
  onSubmit,
  isButtonDisable = false,
  isOpen,
  buttonText = 'Сохранить',
}) => {
  const {isLoading, closeAllPopups} = useContext(PopupContext)

  return (
    <Popup isOpen={isOpen} onClose={closeAllPopups} name={name}>
      <h2 className='popup__title'>{title}</h2>
      <Form
        onSubmit={onSubmit}
        name={name}
        isButtonDisable={isButtonDisable}
        isLoading={isLoading}
        buttonText={buttonText}
      >
        {children}
      </Form>
    </Popup>
  )
}

export default PopupWithForm
