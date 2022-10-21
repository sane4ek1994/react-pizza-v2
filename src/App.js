import React from 'react'
import { Header, Categories, Sort, PizzaBlock } from './components/index'

import './scss/app.scss'

function App() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    fetch('https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items')
      .then(res => {
        return res.json()
      })
      .then(arr => setItems(arr))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {items.map(obj => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
