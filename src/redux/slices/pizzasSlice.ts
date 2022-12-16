import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SearchPizzaParams = {
  category: string
  sortBy: string
  order: string
  search: string
  currentPage: string
}

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

type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  raiting: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: Pizza[]
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    })
  }

  // extraReducers: {
  //   [fetchPizzas.pending]: state => {
  // state.status = 'loading'
  // state.items = []
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  // state.items = action.payload
  // state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: state => {
  // state.status = 'error'
  // state.items = []
  //   }
  // }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
