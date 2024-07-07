import { Component, ReactNode } from 'react'
import styles from './Search.module.scss'

class Search extends Component {
  render(): ReactNode {
    return (
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter game name"
        />
        <button className={styles.button}>Search</button>
      </form>
    )
  }
}

export default Search
