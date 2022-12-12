import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async params => {
  const { category, sortBy, order, search, currentPage } = params
  const { data } = await axios.get(
    `https://635250a6a9f3f34c373a2dfd.mockapi.io/pizzas-items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
  )
  console.log(currentPage)
  return data
})

const initialState = {
  items: [],
  status: 'loading'
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
      console.log(action.payload)
    },
    [fetchPizzas.rejected]: state => {
      state.status = 'error'
      state.items = []
    }
  }
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
