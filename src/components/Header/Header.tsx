import { useContext } from 'react'
import styles from './Header.module.scss'
import { ThemeContext } from '../../context/ThemeContextProvider'

const Header = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) return

  const [theme, setTheme] = themeContext

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Game <span>Galaxy</span>
      </h1>
      <button className={styles.buttonTheme} onClick={changeTheme}>
        {theme === 'dark' ? (
          <span className="material-symbols-outlined">light_mode</span>
        ) : (
          <span className="material-symbols-outlined">dark_mode</span>
        )}
      </button>
    </div>
  )
}

export default Header
