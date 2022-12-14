import React from 'react'
const categories = ['Всё', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  value: number
  onChangeCategory: (idx: number) => void
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
})
