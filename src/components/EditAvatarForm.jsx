import React, {useRef} from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarForm = ({isOpen, onUpdateAvatar}) => {
  const avatarRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <>
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        onSubmit={handleSubmit}
        isOpen={isOpen}
      >
        <label className='popup__field'>
          <input
            ref={avatarRef}
            id='avatar-input'
            className='popup__item popup__item_el_prof'
            type='url'
            name='avatar'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='popup__item-error avatar-input-error'></span>
        </label>
      </PopupWithForm>
    </>
  )
}

export default EditAvatarForm
