import styles from './NotFound.module.scss'
import notFoundImg from '/assets/img/not-found.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={notFoundImg} alt="Not Found image" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>Oops! Page not found</h2>
        <p className={styles.text}>
          The page you are looking for might have been removed or temporarily
          unavailable.
        </p>
        <Link to="/" className={styles.button}>
          Back to Home Page
        </Link>
      </div>
    </div>
  )
}

export default NotFound
