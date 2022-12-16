export type SearchPizzaParams = {
  category: string
  sortBy: string
  order: string
  search: string
  currentPage: string
}

export type Pizza = {
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

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
