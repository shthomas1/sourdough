import { siteConfig, Testimonial } from '../../config/site.config'
import { Section, SectionHeader, Grid } from '../layout'
import './Testimonials.css'

interface TestimonialsProps {
  testimonials?: Testimonial[]
  title?: string
  subtitle?: string
}

/**
 * Testimonials section component
 * Displays customer testimonials in a grid
 */
export const Testimonials = ({
  testimonials = siteConfig.testimonials,
  title = 'What Our Clients Say',
  subtitle = 'Don\'t just take our word for it.',
}: TestimonialsProps) => {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <Section id="testimonials" variant="muted" padding="xl">
      <SectionHeader title={title} subtitle={subtitle} />
      <Grid columns={{ sm: 1, md: 2, lg: testimonials.length }} gap="lg">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            {testimonial.rating && (
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
            )}
            <p className="testimonial-content">"{testimonial.content}"</p>
            <div className="testimonial-author">
              {testimonial.avatar && (
                <div className="testimonial-avatar">{testimonial.avatar}</div>
              )}
              <div className="testimonial-info">
                <div className="testimonial-name">{testimonial.name}</div>
                {(testimonial.role || testimonial.company) && (
                  <div className="testimonial-role">
                    {testimonial.role}
                    {testimonial.role && testimonial.company && ', '}
                    {testimonial.company}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  )
}
