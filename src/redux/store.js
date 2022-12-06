import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/slice'

export const store = configureStore({
  reducer: {
    filter
  }
})
