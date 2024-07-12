import { useState, useEffect, Dispatch, SetStateAction } from 'react'

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const item = localStorage.getItem(key)
  const [value, setValue] = useState<T>(item ? JSON.parse(item) : initialValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
