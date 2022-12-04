import React from 'react'

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'
import { SearchInputContext } from '../context/searchInput.context'

export const Home = () => {
  const { searchValue } = React.useContext(SearchInputContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setcategoryId] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' })

  React.useEffect(() => {
    setIsLoading(true)

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    fetch(
      `https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={index => setcategoryId(index)} />
        <Sort value={sortType} onChangeSort={index => setSortType(index)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={num => setCurrentPage(num)} />
    </div>
  )
}
