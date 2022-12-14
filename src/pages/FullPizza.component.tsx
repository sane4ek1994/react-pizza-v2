import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton } from '../components'

type pizzaType = {
  imageUrl: string
  title: string
  price: number
}

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<pizzaType>()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fethPizza() {
      try {
        const { data } = await axios.get(`https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы...')
        navigate('/')
      }
    }

    fethPizza()
  }, [])

  return (
    <div className='container'>
      {!pizza ? (
        <Skeleton />
      ) : (
        <>
          <img src={pizza.imageUrl} alt={`пицца ${pizza.title}`} />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} ₽</h4>
        </>
      )}
    </div>
  )
}
