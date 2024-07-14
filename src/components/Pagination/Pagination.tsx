import cn from 'clsx'
import styles from './Pagination.module.scss'

interface IProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: IProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={cn(styles['pagination_btn'], {
            [styles.active]: currentPage === i,
          })}
        >
          {i}
        </button>,
      )
    }
    return pages
  }

  return (
    <div className={styles.pagination}>
      <button
        data-testid="prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <img src="/assets/img/arrow_back.svg" alt="Arrow icon" />
      </button>
      {renderPageNumbers()}
      <button
        data-testid="next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <img src="/assets/img/arrow_forward.svg" alt="Arrow icon" />
      </button>
    </div>
  )
}

export default Pagination
