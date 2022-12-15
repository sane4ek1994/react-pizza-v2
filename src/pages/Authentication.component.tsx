import React from 'react'

export const Authentication: React.FC = () => {
  return (
    <>
      <input type='number' />
      <button>войти</button>
      <div id='recaptcha-container'></div>
    </>
  )
}
