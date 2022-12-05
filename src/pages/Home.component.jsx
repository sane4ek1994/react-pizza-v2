import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'

import { SearchInputContext } from '../context/searchInput.context'
import { setCategoryId } from '../redux/slices/filterSlice'

export const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort } = useSelector(state => state.filter)

  const { searchValue } = React.useContext(SearchInputContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  const onChangeCategory = id => dispatch(setCategoryId(id))

  React.useEffect(() => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={num => setCurrentPage(num)} />
    </div>
  )
}
