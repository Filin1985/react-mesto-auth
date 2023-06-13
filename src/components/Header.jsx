import React from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import Menu from './Menu'

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <div className='header__logo'></div>
      </Link>
      <Routes path='/mesto-react'>
        <Route path='/' element={<Menu />} />
        <Route path='/signup' element={<SignInLink />} />
        <Route path='/signin' element={<SignUpLink />} />
      </Routes>
    </header>
  )
}

const SignInLink = () => {
  return (
    <Link className='header__link' to='/signin'>
      Войти
    </Link>
  )
}

const SignUpLink = () => {
  return (
    <Link className='header__link' to='/signup'>
      Регистрация
    </Link>
  )
}

export default Header
