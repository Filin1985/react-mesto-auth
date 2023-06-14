import React, {useState} from 'react'
import mestoLogo from '../images/logo.svg'
import {Link, Routes, Route, useNavigate} from 'react-router-dom'

const Header = ({email, onLogout}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isBurgerMenu = email && isMenuOpen

  return (
    <header className={isBurgerMenu ? 'header header_open' : 'header'}>
      <div className='header__box'>
        <Link to='/react-mesto-auth'>
          <img src={mestoLogo} alt='Логотип Mesto' className='header__logo' />
        </Link>
        {email && (
          <button
            className={
              isBurgerMenu
                ? 'button header__burger header__burger_open'
                : 'button header__burger'
            }
            type='button'
            aria-label='меню'
            onClick={handleOpenMenu}
          ></button>
        )}
      </div>

      <Routes>
        <Route
          path='/react-mesto-auth'
          element={
            <Menu
              email={email}
              onLogout={onLogout}
              isBurgerMenu={isBurgerMenu}
            />
          }
        />
        <Route path='/sign-up' element={<SignInLink />} />
        <Route path='/sign-in' element={<SignUpLink />} />
      </Routes>
    </header>
  )
}

const Menu = (props) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    props.onLogout()
    navigate('/sign-in', {replace: true})
  }

  return (
    <div
      className={
        props.isBurgerMenu
          ? 'header__content header__content_open'
          : 'header__content'
      }
    >
      <p className='header__email'>{props.email}</p>
      <button className='button header__logout' onClick={handleLogout}>
        Выйти
      </button>
    </div>
  )
}

const SignInLink = () => {
  return (
    <Link className='header__link' to='/sign-in'>
      Войти
    </Link>
  )
}

const SignUpLink = () => {
  return (
    <Link className='header__link' to='/sign-up'>
      Регистрация
    </Link>
  )
}

export default Header
