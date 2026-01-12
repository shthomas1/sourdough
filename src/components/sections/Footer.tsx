import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site.config'
import './Footer.css'

/**
 * Footer component
 * Displays company info, navigation, and social links
 */
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{siteConfig.company.name}</h3>
            <p className="footer-description">
              {siteConfig.company.location && (
                <span>{siteConfig.company.location}</span>
              )}
              {siteConfig.company.email && (
                <span>
                  <br />
                  <a href={`mailto:${siteConfig.company.email}`} className="footer-link">
                    {siteConfig.company.email}
                  </a>
                </span>
              )}
              {siteConfig.company.phone && (
                <span>
                  <br />
                  <a href={`tel:${siteConfig.company.phone}`} className="footer-link">
                    {siteConfig.company.phone}
                  </a>
                </span>
              )}
            </p>
          </div>

          {siteConfig.navigation && siteConfig.navigation.length > 0 && (
            <div className="footer-section">
              <h4 className="footer-heading">Navigation</h4>
              <nav className="footer-nav">
                {siteConfig.navigation.map((item) => (
                  item.external ? (
                    <a key={item.href} href={item.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} to={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  )
                ))}
              </nav>
            </div>
          )}

          {siteConfig.socialLinks && siteConfig.socialLinks.length > 0 && (
            <div className="footer-section">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="footer-social">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                  >
                    {social.icon || social.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          {siteConfig.footer?.copyright && (
            <p className="footer-copyright">{siteConfig.footer.copyright}</p>
          )}
          {siteConfig.footer?.links && siteConfig.footer.links.length > 0 && (
            <div className="footer-legal">
              {siteConfig.footer.links.map((link) => (
                link.external ? (
                  <a key={link.href} href={link.href} className="footer-legal-link">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} to={link.href} className="footer-legal-link">
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
