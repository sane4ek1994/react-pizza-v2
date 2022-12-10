import React from 'react'
import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'

import { SearchInputContext } from '../context/searchInput.context'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'
import { sortList } from '../components'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMounted = React.useRef(false)

  const { items, status } = useSelector(state => state.pizza)
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const { searchValue } = React.useContext(SearchInputContext)

  const onChangeCategory = id => dispatch(setCategoryId(id))
  const onChangePage = num => dispatch(setCurrentPage(num))

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchPizzas({ order, sortBy, category, search }))
  }

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage
      }
      const queryString = qs.stringify(params, { skipNulls: true })

      navigate(`/?${queryString}`)

      if (!window.location.search) {
        fetchPizzas()
      }
    }
  }, [categoryId, sort.sortProperty, currentPage])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({ ...params, sort }))
    }
  }, [])

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
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
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы...</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'success' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
