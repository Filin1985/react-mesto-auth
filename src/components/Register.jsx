import React from 'react'
import {useForm} from '../hooks/useForm'
import {Link} from 'react-router-dom'

const Register = ({handleRegister}) => {
  const {values, handleChange} = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    handleRegister(values.email, values.password)
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' action='submit' onSubmit={handleSubmit}>
        <fieldset className='auth__set'>
          <label className='auth__field'>
            <input
              name='email'
              type='email'
              id='email'
              className='auth__input'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              required
            />
            <span className='auth__item-error auth-input-error'></span>
          </label>
          <label className='auth__field'>
            <input
              name='password'
              type='password'
              id='password'
              className='auth__input'
              placeholder='Пароль'
              value={values.password}
              onChange={handleChange}
              required
            />
            <span className='auth__item-error password-input-error'></span>
          </label>
          <button
            className='button button_type_submit button_type_auth'
            type='submit'
          >
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <p className='auth__login'>
        Уже зарегистрировались?{' '}
        <Link to='/sign-in' className='auth__link'>
          Войти
        </Link>
      </p>
    </div>
  )
}

export default Register
