import { ReactNode } from 'react'
import './Page.css'

interface PageProps {
  children: ReactNode
  className?: string
}

/**
 * Page wrapper component
 * Provides consistent page structure and spacing
 */
export const Page = ({ children, className = '' }: PageProps) => {
  return (
    <div className={`page ${className}`.trim()}>
      {children}
    </div>
  )
}
