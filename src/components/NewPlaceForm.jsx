import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

const NewPlaceForm = ({ onClose, isOpen, onAddNewCard }) => {
  const [state, setState] = useState({
    name: '',
    link: '',
  })

  useEffect(() => {
    setState({
      name: '',
      link: '',
    })
  }, [isOpen])

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddNewCard({
      name: state.name,
      link: state.link,
    })
  }

  const isButtonActive = state.name.length === 0 && state.link.length === 0

  return (
    <>
      {isOpen && (
        <PopupWithForm
          name='card'
          title='Новое место'
          onClose={onClose}
          buttonText='Сохранить'
          onSubmit={handleSubmit}
          isButtonDisable={isButtonActive}
        >
          <label className='popup__field'>
            <input
              id='title-input'
              className='popup__item popup__item_el_name'
              type='text'
              name='name'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              value={state.name}
              onChange={handleChange}
              required
            />
            <span className='popup__item-error title-input-error'></span>
          </label>
          <label className='popup__field'>
            <input
              id='text-input'
              className='popup__item popup__item_el_prof'
              type='url'
              name='link'
              placeholder='Ссылка на картинку'
              value={state.link}
              onChange={handleChange}
              required
            />
            <span className='popup__item-error text-input-error'></span>
          </label>
        </PopupWithForm>
      )}
    </>
  )
}

export default NewPlaceForm
