import React from 'react'
import {useForm} from '../hooks/useForm'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../utils/Auth'

const Register = ({setTooltip}) => {
  const {values, handleChange} = useForm({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (values.email && values.password) {
      const {email, password} = values
      auth
        .registerUser(email, password)
        .then((res) => {
          if (res.data) {
            setTooltip({
              text: 'Вы успешно зарегистрированы!',
              type: 'valid',
            })
            navigate('/sign-in', {replace: true})
          }
        })
        .catch((error) => {
          console.log(error)
          setTooltip({
            text: 'Что-то пошло не так! Попробуйте еще раз.',
            type: 'invalid',
          })
        })
    }
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
