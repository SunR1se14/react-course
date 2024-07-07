import { Component, FormEvent, ChangeEvent } from 'react'
import styles from './Search.module.scss'

interface IProps {
  search: (value: string) => void
}

interface IState {
  searchValue: string
}

class Search extends Component<IProps, IState> {
  state: IState = {
    searchValue: '',
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (this.state.searchValue) {
      this.props.search(this.state.searchValue)
      localStorage.setItem(
        'searchValue',
        JSON.stringify(this.state.searchValue.trim()),
      )
    }
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value })
  }

  componentDidMount() {
    const savedSearchValue = localStorage.getItem('searchValue')
    if (savedSearchValue) {
      this.setState({ searchValue: JSON.parse(savedSearchValue) })
      this.props.search(savedSearchValue)
    }
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter game name"
          value={this.state.searchValue}
          onChange={this.onChange}
        />
        <button className={styles.button}>Search</button>
      </form>
    )
  }
}

export default Search
