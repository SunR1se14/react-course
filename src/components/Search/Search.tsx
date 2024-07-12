import { FormEvent, useEffect, useState } from 'react'
import styles from './Search.module.scss'
import useLocalStorage from '../../hooks/useLocalStorage'

interface IProps {
  search: (value: string) => void
}

const Search = ({ search }: IProps) => {
  const [searchValue, setSearchValue] = useLocalStorage<string>(
    'searchValue',
    '',
  )
  const [inputValue, setInputValue] = useState<string>(searchValue)

  useEffect(() => {
    search(searchValue)
  }, [search, searchValue])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue) {
      search(inputValue)
      setSearchValue(inputValue.trim())
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter game name"
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
      />
      <button className={styles.button}>Search</button>
    </form>
  )
}

export default Search
