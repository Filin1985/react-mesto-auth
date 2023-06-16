import React, {useContext, useEffect} from 'react'
import PopupWithForm from './PopupWithForm'
import Input from './ui/Input'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {useForm} from '../hooks/useForm'

const EditProfileForm = ({isOpen, onUpdateUser}) => {
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
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <Input
        idName={'name-input'}
        type={'text'}
        valueName={values.name}
        handleChange={handleChange}
        name={'name'}
        placeholder={'Имя'}
        minLength='2'
        maxLength='40'
        extraClassName='popup__item popup__item_el_name'
        required
      />
      <Input
        idName={'prof-input'}
        type={'text'}
        valueName={values.prof}
        handleChange={handleChange}
        name={'prof'}
        placeholder={'Предназначение'}
        minLength='2'
        maxLength='200'
        extraClassName='popup__item popup__item_el_prof'
        required
      />
    </PopupWithForm>
  )
}

export default EditProfileForm
