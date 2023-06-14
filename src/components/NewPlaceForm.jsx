import React, {useEffect} from 'react'
import PopupWithForm from './PopupWithForm'
import {useForm} from '../hooks/useForm'

const NewPlaceForm = ({onClose, isOpen, onAddNewCard}) => {
  const {values, handleChange, setValues} = useForm({
    name: '',
    prof: '',
  })

  useEffect(() => {
    setValues({
      name: '',
      link: '',
    })
  }, [isOpen, setValues])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddNewCard({
      name: values.name,
      link: values.link,
    })
  }

  const isButtonActive = values.name?.length === 0 && values.link?.length === 0

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
              value={values.name}
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
              value={values.link}
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
