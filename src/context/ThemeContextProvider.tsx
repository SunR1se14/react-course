import { createContext, ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type ThemeContextType = [string, React.Dispatch<React.SetStateAction<string>>]

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
