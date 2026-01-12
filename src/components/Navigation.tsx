import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../config/site.config'
import { ThemeToggle } from './ThemeToggle'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🍞</span>
          <span className="logo-text">{siteConfig.company.name}</span>
        </Link>
        <ul className="nav-links">
          {siteConfig.navigation.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  className={location.pathname === item.href ? 'active' : ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={location.pathname === item.href ? 'active' : ''}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
