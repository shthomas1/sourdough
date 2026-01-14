import { useTheme } from '../contexts/ThemeContext'
import './ThemeToggle.css'

/**
 * Theme toggle button component
 * Allows users to switch between light and dark themes
 */
export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}
