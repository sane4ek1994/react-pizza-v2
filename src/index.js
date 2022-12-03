import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { SearchInputProvider } from './context/searchInput.context'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <SearchInputProvider>
      <App />
    </SearchInputProvider>
  </Router>
)
