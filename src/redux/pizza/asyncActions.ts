import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Pizza, SearchPizzaParams } from './types'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params, thunkApi) => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get(
      `https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )

    if (data.length === 0) {
      return thunkApi.rejectWithValue('Нет пицц...')
    }
    return thunkApi.fulfillWithValue(data)
  }
)
