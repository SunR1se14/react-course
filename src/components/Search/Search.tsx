import { FormEvent, useEffect, useState } from 'react'
import styles from './Search.module.scss'
import useLocalStorage from '../../hooks/useLocalStorage'

interface IProps {
  setSearchValue: (value: string) => void
  onSearchChange: (search: string) => void
}

const Search = ({ setSearchValue, onSearchChange }: IProps) => {
  const [savedSearchValue, setSavedSearchValue] = useLocalStorage<string>(
    'searchValue',
    '',
  )
  const [inputValue, setInputValue] = useState<string>(savedSearchValue)

  useEffect(() => {
    setSearchValue(savedSearchValue)
  }, [setSearchValue, savedSearchValue])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue) {
      setSearchValue(inputValue.trim())
      setSavedSearchValue(inputValue.trim())
      onSearchChange(inputValue.trim())
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
