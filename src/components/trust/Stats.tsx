import { siteConfig, Stat } from '../../config/site.config'
import { Section, Grid } from '../layout'
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
  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <Section variant={variant} padding="xl" className="stats-section">
      <Grid columns={{ sm: 2, md: stats.length }} gap="lg">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-item">
            {stat.icon && <div className="stat-icon">{stat.icon}</div>}
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </Grid>
    </Section>
  )
}
