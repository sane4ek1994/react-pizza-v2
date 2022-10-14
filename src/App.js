import { Header, Categories, Sort, PizzaBlock } from './components/index'

import './scss/app.scss'

function App() {
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
            <PizzaBlock title='Мексиканская' price={500} />
            <PizzaBlock title='Чизбургер-пицца' price={395} />
            <PizzaBlock title='Hello' price={777} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
