import React from 'react'

import { Categories, Sort, PizzaBlock, Skeleton } from '../components'

export const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setcategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' })

  React.useEffect(() => {
    setIsLoading(true)

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(`https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items?${category}&sortBy=${sortBy}&order=${order}`)
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={index => setcategoryId(index)} />
        <Sort value={sortType} onChangeSort={index => setSortType(index)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}
