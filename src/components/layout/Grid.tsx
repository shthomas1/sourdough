import { ReactNode } from 'react'
import './Grid.css'

interface GridProps {
  children: ReactNode
  columns?: {
    sm?: number
    md?: number
    lg?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Responsive grid component
 * Mobile-first grid system with configurable columns
 */
export const Grid = ({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'md',
  className = ''
}: GridProps) => {
  const gridStyle = {
    '--grid-cols-sm': columns.sm || 1,
    '--grid-cols-md': columns.md || columns.sm || 2,
    '--grid-cols-lg': columns.lg || columns.md || columns.sm || 3,
  } as React.CSSProperties

  return (
    <div 
      className={`grid grid-gap-${gap} ${className}`.trim()}
      style={gridStyle}
    >
      {children}
    </div>
  )
}
