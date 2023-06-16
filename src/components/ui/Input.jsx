import React from 'react'

const Input = ({
  idName,
  type,
  valueName,
  handleChange,
  name,
  placeholder,
  minLength,
  maxLength,
  extraClassName,
  inputRef,
}) => {
  return (
    <label className='popup__field'>
      <input
        id={idName}
        className={extraClassName}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={valueName}
        onChange={handleChange}
        required
      />
      <span className='popup__item-error title-input-error'></span>
    </label>
  )
}

export default Input
