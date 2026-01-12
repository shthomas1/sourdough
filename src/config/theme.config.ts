/**
 * Theme Configuration
 * 
 * Customize colors, fonts, and styling without touching CSS files.
 * The theme system will generate CSS variables from these values.
 */

export interface ThemeColors {
  // Primary brand colors
  primary: string
  primaryDark: string
  primaryLight: string
  
  // Neutral colors
  background: string
  surface: string
  text: string
  textSecondary: string
  
  // Semantic colors
  success: string
  error: string
  warning: string
  info: string
  
  // Border and divider
  border: string
  divider: string
}

export interface ThemeConfig {
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  fonts: {
    heading: string
    body: string
    mono: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
}

// Default theme - Edit this to customize appearance
export const themeConfig: ThemeConfig = {
  colors: {
    light: {
      primary: '#b89d7a', // Sourdough brown
      primaryDark: '#8b6f47',
      primaryLight: '#c9a961',
      background: '#f5f1e8', // Sourdough cream
      surface: '#ffffff',
      text: '#3d2e1f',
      textSecondary: '#5a4a3a',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196f3',
      border: '#d4c4a8',
      divider: '#e8dcc6',
    },
    dark: {
      primary: '#c9a961',
      primaryDark: '#b89d7a',
      primaryLight: '#d4c4a8',
      background: '#1a1612',
      surface: '#2a241f',
      text: '#f5f1e8',
      textSecondary: '#d4c4a8',
      success: '#66bb6a',
      error: '#ef5350',
      warning: '#ffa726',
      info: '#42a5f5',
      border: '#3d2e1f',
      divider: '#2a241f',
    },
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'Menlo, Monaco, "Courier New", monospace',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
}
