import { ReactNode } from 'react'
import './SectionHeader.css'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  children?: ReactNode
}

/**
 * Section header component
 * Provides consistent heading styles for sections
 */
export const SectionHeader = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '',
  children
}: SectionHeaderProps) => {
  return (
    <div className={`section-header section-header-${align} ${className}`.trim()}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}
