import {
  Header,
  Categories,
  Sort,
  PizzaBlock
} from "./components/index";

import './scss/app.scss';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title='Мексиканская' price={500}/>
            <PizzaBlock  title='Чизбургер-пицца' price={395}/>
            <PizzaBlock title='Hello' price={777}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;