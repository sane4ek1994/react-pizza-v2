import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { SearchInputProvider } from './context/searchInput.context'
import { store } from './redux/store'
import { Provider } from 'react-redux'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <SearchInputProvider>
        <App />
      </SearchInputProvider>
    </Router>
  </Provider>
)
