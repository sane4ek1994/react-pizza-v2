import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'

import { SearchInputContext } from '../context/searchInput.context'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/slice'
import { sortList } from '../components'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const { searchValue } = React.useContext(SearchInputContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const onChangeCategory = id => dispatch(setCategoryId(id))
  const onChangePage = num => dispatch(setCurrentPage(num))

  const fetchPizzas = () => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })
  }

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [])

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
