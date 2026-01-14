import { siteConfig, Stat } from '../../config/site.config'
import { Section, Grid } from '../layout'
import { useScrollAnimation, useCounterAnimation } from '../../hooks/useScrollAnimation'
import './Stats.css'

interface StatsProps {
  stats?: Stat[]
  variant?: 'default' | 'primary' | 'muted'
}

/**
 * Statistics component
 * Displays key metrics in a grid
 */
export const Stats = ({
  stats = siteConfig.stats,
  variant = 'default',
}: StatsProps) => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px',
  })

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <Section 
      variant={variant} 
      padding="xl" 
      className="stats-section"
      ref={sectionRef}
    >
      <Grid columns={{ sm: 2, md: 3, lg: 3 }} gap="lg">
          {stats.map((stat, index) => {
            const { ref: statRef, isVisible: statVisible } = useScrollAnimation({
              threshold: 0.2,
              rootMargin: '0px',
              delay: index * 150, // Stagger counter animations
            })
            
            const animatedValue = useCounterAnimation(stat.value, statVisible, 2000)

            return (
              <div
                key={stat.id}
                ref={statRef}
                className={`stat-item fade-in-up ${statVisible ? 'visible' : ''}`}
              >
                {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                <div className="stat-value">{animatedValue}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            )
          })}
      </Grid>
    </Section>
  )
}
