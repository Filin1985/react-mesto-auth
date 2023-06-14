import React from 'react'
import spinner from '../images/spinner.gif'

const Loader = () => {
  return (
    <div className='loader'>
      <img src={spinner} alt='Загрузка' />
    </div>
  )
}

export default Loader
