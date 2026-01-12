import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themeConfig, ThemeConfig } from '../config/theme.config'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
  theme: ThemeConfig['colors']['light'] | ThemeConfig['colors']['dark']
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultMode?: ThemeMode
}

/**
 * Theme provider component
 * Manages theme state and applies CSS variables
 */
export const ThemeProvider = ({ children, defaultMode = 'light' }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme-mode') as ThemeMode
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return defaultMode
  })

  const theme = themeConfig.colors[mode]

  useEffect(() => {
    // Apply CSS variables to document root
    const root = document.documentElement
    const colors = themeConfig.colors[mode]
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-primary-dark', colors.primaryDark)
    root.style.setProperty('--color-primary-light', colors.primaryLight)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-text', colors.text)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
    root.style.setProperty('--color-success', colors.success)
    root.style.setProperty('--color-error', colors.error)
    root.style.setProperty('--color-warning', colors.warning)
    root.style.setProperty('--color-info', colors.info)
    root.style.setProperty('--color-border', colors.border)
    root.style.setProperty('--color-divider', colors.divider)

    // Apply font variables
    root.style.setProperty('--font-heading', themeConfig.fonts.heading)
    root.style.setProperty('--font-body', themeConfig.fonts.body)
    root.style.setProperty('--font-mono', themeConfig.fonts.mono)

    // Apply spacing variables
    Object.entries(themeConfig.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value)
    })

    // Apply border radius variables
    Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
    })

    // Apply shadow variables (same for both themes)
    root.style.setProperty('--shadow-sm', '0 2px 4px rgba(0, 0, 0, 0.1)')
    root.style.setProperty('--shadow-md', '0 4px 8px rgba(0, 0, 0, 0.15)')
    root.style.setProperty('--shadow-lg', '0 8px 16px rgba(0, 0, 0, 0.2)')

    // Save to localStorage
    localStorage.setItem('theme-mode', mode)
    
    // Update body class for additional styling if needed
    document.body.className = `theme-${mode}`
  }, [mode, theme])

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode)
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to access theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
