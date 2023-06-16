import React from 'react'

const Form = ({
  onSubmit,
  name,
  isButtonDisable,
  isLoading,
  buttonText,
  children,
}) => {
  return (
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
          {isLoading ? `${buttonText}...` : `${buttonText}`}
        </button>
      </fieldset>
    </form>
  )
}

export default Form
