import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { favoritesActions } from '../../store/reducers/favorites.slice'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import styles from './SelectedItems.module.scss'

const SelectedItems = () => {
  const { favorites } = useAppSelector(s => s)
  const dispatch = useAppDispatch()

  const handleDownload = () => {
    const csvData = Papa.unparse(
      favorites.map(game => ({
        name: game.name,
        released: game.released,
        genres: game.genres.map(genre => genre.name).join(', '),
        url: `https://sunr1se14-gamegalaxy.netlify.app/details/${game.slug}`,
      })),
    )

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })

    const fileName = `${favorites.length}_games.csv`

    saveAs(blob, fileName)
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Favorite games</h4>
      <div className={styles.count}>{favorites.length}</div>
      <div className={styles.buttons}>
        <button className={styles.download} onClick={handleDownload}>
          Download
        </button>
        <button
          className={styles.unselect}
          onClick={() => dispatch(favoritesActions.unSelectAll())}
        >
          Unselect all
        </button>
      </div>
    </div>
  )
}

export default SelectedItems
