import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/index'
import { Cart, Home, NotFound, Authentication } from './pages'

import './scss/app.scss'

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
