import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export const FullPizza = () => {
  const [pizza, setPizza] = React.useState()
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
        console.warn(error.message)
      }
    }

    fethPizza()
  }, [])

  if (!pizza) {
    return 'Загрузка...'
  }

  const { imageUrl, price, title } = pizza

  return (
    <div className='container'>
      <img src={imageUrl} alt='картинка пиццы' />
      <h2>{title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus praesentium culpa voluptate reprehenderit,
        eligendi eos corporis dolorem illo numquam doloribus dolores nulla corrupti harum dolore deserunt quis nemo
        consequuntur aperiam!
      </p>
      <h4>{price} ₽</h4>
    </div>
  )
}
