export const bgRating = (rating: number, styles: CSSModuleClasses) => {
  if (rating > 4) {
    return styles.good
  } else if (rating > 3) {
    return styles.normal
  } else {
    return styles.bad
  }
}
