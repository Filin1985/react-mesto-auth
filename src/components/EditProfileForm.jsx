import React, {useContext, useEffect} from 'react'
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { useForm } from '../hooks/useForm'

const EditProfileForm = ({onClose, isOpen, onUpdateUser}) => {
  const currentUser = useContext(CurrentUserContext)
  const {values, handleChange, setValues} = useForm({
    name: '',
    prof: '',
  })

  useEffect(() => {
    setValues({
      name: currentUser?.name || '',
      prof: currentUser?.about || '',
    })
  }, [currentUser, isOpen, setValues])


  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({
      name: values.name,
      about: values.prof,
    })
  }

  return (
    <>
      {isOpen && (
        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          onClose={onClose}
          buttonText='Сохранить'
          onSubmit={handleSubmit}
        >
          <label className='popup__field'>
            <input
              id='name-input'
              className='popup__item popup__item_el_name'
              name='name'
              minLength='2'
              maxLength='40'
              type='text'
              placeholder='Имя'
              value={values.name}
              onChange={handleChange}
              required
            />
            <span className='popup__item-error name-input-error'></span>
          </label>
          <label className='popup__field'>
            <input
              id='prof-input'
              className='popup__item popup__item_el_prof'
              name='prof'
              type='text'
              minLength='2'
              maxLength='200'
              placeholder='Предназначение'
              value={values.prof}
              onChange={handleChange}
              required
            />
            <span className='popup__item-error prof-input-error'></span>
          </label>
        </PopupWithForm>
      )}
    </>
  )
}

export default EditProfileForm
