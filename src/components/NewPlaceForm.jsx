import React, {useEffect} from 'react'
import PopupWithForm from './PopupWithForm'
import Input from './ui/Input'
import {useForm} from '../hooks/useForm'

const NewPlaceForm = ({isOpen, onAddNewCard}) => {
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
    <PopupWithForm
      name='card'
      title='Новое место'
      onSubmit={handleSubmit}
      isButtonDisable={isButtonActive}
      isOpen={isOpen}
    >
      <Input
        idName={'title-input'}
        type={'text'}
        valueName={values.name}
        handleChange={handleChange}
        name={'name'}
        placeholder={'Название'}
        minLength='2'
        maxLength='30'
        extraClassName='popup__item popup__item_el_name'
        required
      />
      <Input
        idName={'text-input'}
        type={'url'}
        valueName={values.link}
        handleChange={handleChange}
        name={'link'}
        placeholder={'Ссылка на картинку'}
        extraClassName='popup__item popup__item_el_name'
        required
      />
    </PopupWithForm>
  )
}

export default NewPlaceForm
