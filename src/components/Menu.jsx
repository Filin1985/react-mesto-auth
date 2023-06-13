import React from 'react'

const Menu = (props) => {
  return (
    <>
      <button
        className='menu__burger'
        type='button'
        aria-label='меню'
        onClick={() => {}}
      ></button>
      <div className='menu__content'>
        <p className='menu__email'>{props.email}</p>
        <button className='menu__logout' onClick={() => {}}>
          Выйти
        </button>
      </div>
    </>
  )
}

export default Menu
