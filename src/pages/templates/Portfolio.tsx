import { Page } from '../../components/layout'
import { SEO } from '../../components/SEO'
import { Hero, About as AboutSection, Testimonials, CTA, Contact } from '../../components/sections'
import { Stats, ClientLogos } from '../../components/trust'
import { Section, SectionHeader, Grid } from '../../components/layout'
import { siteConfig } from '../../config/site.config'
import './Portfolio.css'

interface PortfolioItem {
  id: string
  title: string
  description: string
  image?: string
  category?: string
  link?: string
}

/**
 * Portfolio template
 * Showcase work/projects with a portfolio grid
 */
export const Portfolio = () => {
  // Example portfolio items - replace with your actual projects
  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Project One',
      description: 'Replace this with your project description.',
      category: 'Web Design',
    },
    {
      id: '2',
      title: 'Project Two',
      description: 'Replace this with your project description.',
      category: 'Development',
    },
    {
      id: '3',
      title: 'Project Three',
      description: 'Replace this with your project description.',
      category: 'Branding',
    },
  ]

  return (
    <Page>
      <SEO
        title="Portfolio"
        description={`Portfolio of work by ${siteConfig.company.name}`}
      />
      <Hero
        title="Our Work"
        subtitle="Explore our portfolio of successful projects"
      />
      <AboutSection />
      <Stats />
      <Section id="portfolio" padding="xl">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of our recent work"
        />
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-item">
              {item.image ? (
                <img src={item.image} alt={item.title} className="portfolio-image" />
              ) : (
                <div className="portfolio-placeholder">
                  <div className="portfolio-placeholder-icon">📁</div>
                </div>
              )}
              <div className="portfolio-content">
                {item.category && (
                  <span className="portfolio-category">{item.category}</span>
                )}
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </Grid>
      </Section>
      <ClientLogos />
      <Testimonials />
      <CTA />
      <Contact />
    </Page>
  )
}
