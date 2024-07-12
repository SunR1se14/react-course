import { FormEvent, useState, useEffect } from 'react'
import styles from './Search.module.scss'

interface IProps {
  search: (value: string) => void
}

const Search = ({ search }: IProps) => {
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue')
    if (savedSearchValue) {
      setSearchValue(JSON.parse(savedSearchValue))
      search(savedSearchValue)
    }
  }, [search])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue) {
      search(searchValue)
      localStorage.setItem('searchValue', JSON.stringify(searchValue.trim()))
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter game name"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
      />
      <button className={styles.button}>Search</button>
    </form>
  )
}

export default Search
