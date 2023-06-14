import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm} from '../hooks/useForm'
import {auth} from '../utils/Auth'

const Login = ({setTooltip, handleLogin}) => {
  const {values, handleChange} = useForm({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    auth
      .loginUser(values.email, values.password)
      .then((res) => {
        localStorage.setItem('token', res.token)
        handleLogin()
        navigate('/mesto-react')
      })
      .catch((error) => {
        console.log(error)
        setTooltip({
          text: 'Что-то пошло не так! Попробуйте еще раз.',
          type: 'invalid',
        })
      })
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
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
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default Login
