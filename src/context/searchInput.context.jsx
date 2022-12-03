import React from 'react'

export const SearchInputContext = React.createContext({
  searchValue: '',
  setSearchValue: () => {}
})

export const SearchInputProvider = ({ children }) => {
  const [searchValue, setSearchValue] = React.useState('')
  const value = { searchValue, setSearchValue }

  return <SearchInputContext.Provider value={value}>{children}</SearchInputContext.Provider>
}
