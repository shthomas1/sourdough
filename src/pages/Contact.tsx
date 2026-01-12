import { Page } from '../components/layout'
import { SEO } from '../components/SEO'
import { Contact as ContactSection } from '../components/sections'
import { siteConfig } from '../config/site.config'

/**
 * Contact page using section components
 */
const Contact = () => {
  return (
    <Page>
      <SEO
        title="Contact"
        description={`Contact ${siteConfig.company.name}`}
      />
      <ContactSection
        formProvider="api"
        formProviderConfig={{
          api: {
            endpoint: '/api/contacts',
            table: 'contacts',
          },
        }}
      />
    </Page>
  )
}

export default Contact
