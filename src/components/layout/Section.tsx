import { ReactNode, forwardRef } from 'react'
import './Section.css'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'muted'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Section wrapper component
 * Provides consistent section spacing and styling variants
 */
export const Section = forwardRef<HTMLElement, SectionProps>(({ 
  children, 
  id,
  className = '', 
  variant = 'default',
  padding = 'lg'
}, ref) => {
  return (
    <section 
      ref={ref}
      id={id}
      className={`section section-${variant} section-padding-${padding} ${className}`.trim()}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  )
})

Section.displayName = 'Section'
