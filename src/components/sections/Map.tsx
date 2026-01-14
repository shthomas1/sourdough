import { Fragment, useRef, useState, useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, Polygon, useMap } from 'react-leaflet'
import type { Circle as CircleType, Polygon as PolygonType } from 'leaflet'
import { siteConfig, MapConfig, AffectedArea, ContactInfo } from '../../config/site.config'
import { Section, SectionHeader } from '../layout'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './Map.css'

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapProps {
  mapConfig?: MapConfig
  title?: string
  subtitle?: string
}

// Helper function to get severity color
const getSeverityColor = (severity?: AffectedArea['severity']): string => {
  switch (severity) {
    case 'critical':
      return '#dc2626' // red-600
    case 'high':
      return '#ea580c' // orange-600
    case 'medium':
      return '#f59e0b' // amber-500
    case 'low':
      return '#eab308' // yellow-500
    default:
      return '#3b82f6' // blue-500
  }
}

// Helper function to get severity fill color
const getSeverityFillColor = (severity?: AffectedArea['severity']): string => {
  switch (severity) {
    case 'critical':
      return 'rgba(220, 38, 38, 0.3)' // red-600 with opacity
    case 'high':
      return 'rgba(234, 88, 12, 0.3)' // orange-600 with opacity
    case 'medium':
      return 'rgba(245, 158, 11, 0.3)' // amber-500 with opacity
    case 'low':
      return 'rgba(234, 179, 8, 0.3)' // yellow-500 with opacity
    default:
      return 'rgba(59, 130, 246, 0.3)' // blue-500 with opacity
  }
}

// Check if area is highly affected (high or critical severity)
const isHighlyAffected = (severity?: AffectedArea['severity']): boolean => {
  return severity === 'high' || severity === 'critical'
}

/**
 * Tabbed popup content component for highly affected areas
 */
const TabbedPopupContent = ({ area }: { area: AffectedArea }) => {
  const hasHelpInfo = area.waysToHelp && area.waysToHelp.length > 0
  const hasContacts = area.contacts && area.contacts.length > 0

  // Determine initial tab - prefer help if available, otherwise contact
  const getInitialTab = (): 'help' | 'contact' => {
    if (hasHelpInfo) return 'help'
    if (hasContacts) return 'contact'
    return 'help' // fallback
  }
  
  const [activeTab, setActiveTab] = useState<'help' | 'contact'>(getInitialTab())

  return (
    <div className="map-popup">
      <h3>{area.name}</h3>
      {area.description && <p className="area-description">{area.description}</p>}
      {area.severity && (
        <span className={`severity-badge severity-${area.severity}`}>
          {area.severity.toUpperCase()}
        </span>
      )}
      
      {/* Tabs for areas with help info or contacts */}
      {(hasHelpInfo || hasContacts) && (
        <div className="popup-tabs">
          <div className="tab-buttons">
            {hasHelpInfo && (
              <button
                className={`tab-button ${activeTab === 'help' ? 'active' : ''}`}
                onClick={() => setActiveTab('help')}
              >
                Ways to Help
              </button>
            )}
            {hasContacts && (
              <button
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Who to Contact
              </button>
            )}
          </div>
          
          <div className="tab-content">
            {activeTab === 'help' && hasHelpInfo && (
              <div className="tab-panel">
                <h4>Ways to Help</h4>
                <ul className="help-list">
                  {area.waysToHelp.map((way, index) => (
                    <li key={index}>{way}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'contact' && hasContacts && (
              <div className="tab-panel">
                <h4>Who to Contact</h4>
                <div className="contacts-list">
                  {area.contacts.map((contact, index) => (
                    <div key={index} className="contact-item">
                      <div className="contact-name">{contact.name}</div>
                      {contact.role && <div className="contact-role">{contact.role}</div>}
                      {contact.organization && (
                        <div className="contact-org">{contact.organization}</div>
                      )}
                      <div className="contact-details">
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="contact-link">
                            {contact.phone}
                          </a>
                        )}
                        {contact.email && (
                          <a href={`mailto:${contact.email}`} className="contact-link">
                            {contact.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Component for a clickable area (Circle or Polygon) that zooms and shows description
 */
const ClickableArea = ({ area }: { area: AffectedArea }) => {
  const map = useMap()
  const circleRef = useRef<CircleType>(null)
  const polygonRef = useRef<PolygonType>(null)
  
  const handleAreaClick = () => {
    // Calculate appropriate zoom level based on radius
    let zoomLevel = 15
    if (area.radius) {
      // Calculate zoom level to fit the circle nicely
      // Rough calculation: larger radius = lower zoom
      if (area.radius > 5000) zoomLevel = 12
      else if (area.radius > 2000) zoomLevel = 13
      else if (area.radius > 1000) zoomLevel = 14
      else zoomLevel = 15
    }
    
    // Zoom to the area
    map.setView(area.coordinates, zoomLevel, {
      animate: true,
      duration: 0.5,
    })
    
    // Open popup after a short delay to allow zoom animation
    setTimeout(() => {
      if (area.radius && circleRef.current) {
        circleRef.current.openPopup()
      } else if (area.polygon && polygonRef.current) {
        polygonRef.current.openPopup()
      }
    }, 600)
  }
  
  return (
    <Fragment>
      {/* Render circle if radius is provided */}
      {area.radius && (
        <Circle
          ref={circleRef}
          center={area.coordinates}
          radius={area.radius}
          pathOptions={{
            color: getSeverityColor(area.severity),
            fillColor: getSeverityFillColor(area.severity),
            fillOpacity: 0.4,
            weight: 2,
          }}
          eventHandlers={{
            click: handleAreaClick,
          }}
        >
          <Popup>
            <TabbedPopupContent area={area} />
          </Popup>
        </Circle>
      )}
      
      {/* Render polygon if provided */}
      {area.polygon && area.polygon.length > 0 && (
        <Polygon
          ref={polygonRef}
          positions={area.polygon}
          pathOptions={{
            color: getSeverityColor(area.severity),
            fillColor: getSeverityFillColor(area.severity),
            fillOpacity: 0.4,
            weight: 2,
          }}
          eventHandlers={{
            click: handleAreaClick,
          }}
        >
          <Popup>
            <TabbedPopupContent area={area} />
          </Popup>
        </Polygon>
      )}
    </Fragment>
  )
}

/**
 * Component for a clickable marker that zooms in when clicked
 */
const ClickableMarker = ({ area }: { area: AffectedArea }) => {
  const map = useMap()
  const markerRef = useRef<L.Marker>(null)
  
  const handleMarkerClick = () => {
    // Zoom in when marker is clicked
    map.setView(area.coordinates, 15, {
      animate: true,
      duration: 0.5,
    })
    
    // Open popup after zoom animation
    setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup()
      }
    }, 600)
  }
  
  return (
    <Marker 
      ref={markerRef}
      position={area.coordinates}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      <Popup>
        <TabbedPopupContent area={area} />
        <p className="map-hint">💡 Click marker to zoom in</p>
      </Popup>
    </Marker>
  )
}

/**
 * Component to control map zoom from outside MapContainer
 */
const MapController = ({ 
  targetArea 
}: { 
  targetArea: AffectedArea | null 
}) => {
  const map = useMap()
  
  useEffect(() => {
    if (targetArea) {
      // Calculate appropriate zoom level
      let zoomLevel = 15
      if (targetArea.radius) {
        if (targetArea.radius > 5000) zoomLevel = 12
        else if (targetArea.radius > 2000) zoomLevel = 13
        else if (targetArea.radius > 1000) zoomLevel = 14
        else zoomLevel = 15
      }
      
      // Zoom to the area
      map.setView(targetArea.coordinates, zoomLevel, {
        animate: true,
        duration: 0.5,
      })
    }
  }, [targetArea, map])
  
  return null
}

/**
 * Component to display area details (ways to help and contacts)
 */
const AreaDetailsPanel = ({ 
  area, 
  onClose 
}: { 
  area: AffectedArea
  onClose: () => void 
}) => {
  const hasHelpInfo = area.waysToHelp && area.waysToHelp.length > 0
  const hasContacts = area.contacts && area.contacts.length > 0
  const [activeTab, setActiveTab] = useState<'help' | 'contact'>(
    hasHelpInfo ? 'help' : 'contact'
  )

  return (
    <div className="area-details-panel">
      <div className="area-details-header">
        <div className="area-details-title">
          <button className="back-button" onClick={onClose} aria-label="Back">
            Back
          </button>
          <h3>{area.name}</h3>
        </div>
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      {area.description && (
        <p className="area-description">{area.description}</p>
      )}
      {area.severity && (
        <span className={`severity-badge severity-${area.severity}`}>
          {area.severity.toUpperCase()}
        </span>
      )}
      
      {(hasHelpInfo || hasContacts) && (
        <div className="details-tabs">
          <div className="tab-buttons">
            {hasHelpInfo && (
              <button
                className={`tab-button ${activeTab === 'help' ? 'active' : ''}`}
                onClick={() => setActiveTab('help')}
              >
                Ways to Help
              </button>
            )}
            {hasContacts && (
              <button
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Who to Contact
              </button>
            )}
          </div>
          
          <div className="tab-content">
            {activeTab === 'help' && hasHelpInfo && (
              <div className="tab-panel">
                <h4>Ways to Help</h4>
                <ul className="help-list">
                  {area.waysToHelp.map((way, index) => (
                    <li key={index}>{way}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'contact' && hasContacts && (
              <div className="tab-panel">
                <h4>Who to Contact</h4>
                <div className="contacts-list">
                  {area.contacts.map((contact, index) => (
                    <div key={index} className="contact-item">
                      <div className="contact-name">{contact.name}</div>
                      {contact.role && <div className="contact-role">{contact.role}</div>}
                      {contact.organization && (
                        <div className="contact-org">{contact.organization}</div>
                      )}
                      <div className="contact-details">
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="contact-link">
                            {contact.phone}
                          </a>
                        )}
                        {contact.email && (
                          <a href={`mailto:${contact.email}`} className="contact-link">
                            {contact.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Map section component
 * Displays an interactive map with highlighted affected areas
 */
export const Map = ({
  mapConfig = siteConfig.map,
  title,
  subtitle,
}: MapProps) => {
  const [selectedSeverity, setSelectedSeverity] = useState<AffectedArea['severity'] | null>(null)
  const [selectedArea, setSelectedArea] = useState<AffectedArea | null>(null)

  if (!mapConfig) {
    return null
  }

  // Filter areas by selected severity
  const filteredAreas = selectedSeverity
    ? mapConfig.affectedAreas?.filter(area => area.severity === selectedSeverity) || []
    : []

  const handleSeverityClick = (severity: AffectedArea['severity']) => {
    if (selectedSeverity === severity) {
      setSelectedSeverity(null)
      setSelectedArea(null)
    } else {
      setSelectedSeverity(severity)
      setSelectedArea(null)
    }
  }

  const handleAreaClick = (area: AffectedArea) => {
    setSelectedArea(area)
  }

  return (
    <Section id="map" padding="xl">
      <SectionHeader 
        title={title || mapConfig.title || 'Affected Areas Map'} 
        subtitle={subtitle || mapConfig.subtitle} 
      />
      <div className="map-container">
        <MapContainer
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          style={{ height: '500px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController targetArea={selectedArea} />
          {mapConfig.affectedAreas?.map((area) => (
            <Fragment key={area.id}>
              <ClickableArea area={area} />
              <ClickableMarker area={area} />
            </Fragment>
          ))}
        </MapContainer>
      </div>
      
      {/* Legend with clickable severity levels */}
      {mapConfig.affectedAreas && mapConfig.affectedAreas.length > 0 && (
        <div className="map-legend">
          <h4>Severity Levels</h4>
          <div className="legend-items">
            <button
              className={`legend-item clickable ${selectedSeverity === 'critical' ? 'active' : ''}`}
              onClick={() => handleSeverityClick('critical')}
            >
              <span className="legend-color" style={{ backgroundColor: getSeverityColor('critical') }}></span>
              <span>Critical</span>
              {mapConfig.affectedAreas?.filter(a => a.severity === 'critical').length ? (
                <span className="area-count">
                  ({mapConfig.affectedAreas.filter(a => a.severity === 'critical').length})
                </span>
              ) : null}
            </button>
            <button
              className={`legend-item clickable ${selectedSeverity === 'high' ? 'active' : ''}`}
              onClick={() => handleSeverityClick('high')}
            >
              <span className="legend-color" style={{ backgroundColor: getSeverityColor('high') }}></span>
              <span>High</span>
              {mapConfig.affectedAreas?.filter(a => a.severity === 'high').length ? (
                <span className="area-count">
                  ({mapConfig.affectedAreas.filter(a => a.severity === 'high').length})
                </span>
              ) : null}
            </button>
            <button
              className={`legend-item clickable ${selectedSeverity === 'medium' ? 'active' : ''}`}
              onClick={() => handleSeverityClick('medium')}
            >
              <span className="legend-color" style={{ backgroundColor: getSeverityColor('medium') }}></span>
              <span>Medium</span>
              {mapConfig.affectedAreas?.filter(a => a.severity === 'medium').length ? (
                <span className="area-count">
                  ({mapConfig.affectedAreas.filter(a => a.severity === 'medium').length})
                </span>
              ) : null}
            </button>
            <button
              className={`legend-item clickable ${selectedSeverity === 'low' ? 'active' : ''}`}
              onClick={() => handleSeverityClick('low')}
            >
              <span className="legend-color" style={{ backgroundColor: getSeverityColor('low') }}></span>
              <span>Low</span>
              {mapConfig.affectedAreas?.filter(a => a.severity === 'low').length ? (
                <span className="area-count">
                  ({mapConfig.affectedAreas.filter(a => a.severity === 'low').length})
                </span>
              ) : null}
            </button>
          </div>
        </div>
      )}

      {/* Areas list for selected severity */}
      {selectedSeverity && !selectedArea && (
        <div className="severity-areas-list">
          <div className="areas-list-header">
            <h4>
              {selectedSeverity.toUpperCase()} Severity Areas
              {filteredAreas.length > 0 && (
                <span className="areas-count">({filteredAreas.length})</span>
              )}
            </h4>
            <button 
              className="close-button" 
              onClick={() => setSelectedSeverity(null)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          {filteredAreas.length > 0 ? (
            <div className="areas-list">
              {filteredAreas.map((area) => (
                <button
                  key={area.id}
                  className="area-list-item"
                  onClick={() => handleAreaClick(area)}
                >
                  <div className="area-list-name">{area.name}</div>
                  {area.description && (
                    <div className="area-list-description">{area.description}</div>
                  )}
                  <div className="area-list-arrow">&gt;</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="no-areas-message">
              <div className="no-areas-icon">•</div>
              <h5>No Areas Affected</h5>
              <p>There are currently no areas with {selectedSeverity} severity level. This is good news!</p>
            </div>
          )}
        </div>
      )}

      {/* Area details panel */}
      {selectedArea && (
        <AreaDetailsPanel 
          area={selectedArea} 
          onClose={() => {
            setSelectedArea(null)
            // Keep severity selected so user can click another area
          }}
        />
      )}
    </Section>
  )
}
