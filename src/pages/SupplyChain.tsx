import { useState } from 'react'
import { Page } from '../components/layout'
import { SEO } from '../components/SEO'
import './SupplyChain.css'

// Mock data types
interface Clinic {
  id: number
  name: string
  location: string
  inventoryLevel: number // by percentage
  status: 'normal' | 'low' | 'critical'
  lastShipment: string
  nextShipment: string
  shippingStatus: 'on-time' | 'delayed' | 'at-risk'
}

interface InventoryItem {
  id: number
  name: string
  category: string
  currentStock: number
  minThreshold: number
  maxCapacity: number
  clinicId: number
}

interface ShippingLog {
  id: number
  clinicId: number
  shipmentDate: string
  expectedDelivery: string
  status: 'in-transit' | 'delivered' | 'delayed'
  carrier: string
  trackingNumber: string
}

// Mock data
const mockClinics: Clinic[] = [
  {
    id: 1,
    name: 'Riverside Dialysis Center',
    location: 'Birmingham, AL',
    inventoryLevel: 45,
    status: 'low',
    lastShipment: '2024-01-15',
    nextShipment: '2024-01-22',
    shippingStatus: 'at-risk'
  },
  {
    id: 2,
    name: 'Coastal Medical Clinic',
    location: 'Mobile, AL',
    inventoryLevel: 78,
    status: 'normal',
    lastShipment: '2024-01-18',
    nextShipment: '2024-01-25',
    shippingStatus: 'on-time'
  },
  {
    id: 3,
    name: 'Mountain View Dialysis',
    location: 'Huntsville, AL',
    inventoryLevel: 25,
    status: 'critical',
    lastShipment: '2024-01-10',
    nextShipment: '2024-01-20',
    shippingStatus: 'delayed'
  },
  {
    id: 4,
    name: 'Central Health Facility',
    location: 'Montgomery, AL',
    inventoryLevel: 65,
    status: 'normal',
    lastShipment: '2024-01-19',
    nextShipment: '2024-01-26',
    shippingStatus: 'on-time'
  },
  {
    id: 5,
    name: 'Northern Dialysis Center',
    location: 'Decatur, AL',
    inventoryLevel: 35,
    status: 'low',
    lastShipment: '2024-01-12',
    nextShipment: '2024-01-24',
    shippingStatus: 'at-risk'
  }
]

const mockInventory: InventoryItem[] = [
  { id: 1, name: 'PD Solution Bags', category: 'Solutions', currentStock: 450, minThreshold: 500, maxCapacity: 2000, clinicId: 1 },
  { id: 2, name: 'Dialysis Catheters', category: 'Equipment', currentStock: 120, minThreshold: 150, maxCapacity: 500, clinicId: 1 },
  { id: 3, name: 'PD Solution Bags', category: 'Solutions', currentStock: 780, minThreshold: 500, maxCapacity: 2000, clinicId: 2 },
  { id: 4, name: 'Dialysis Catheters', category: 'Equipment', currentStock: 200, minThreshold: 150, maxCapacity: 500, clinicId: 2 },
  { id: 5, name: 'PD Solution Bags', category: 'Solutions', currentStock: 250, minThreshold: 500, maxCapacity: 2000, clinicId: 3 },
  { id: 6, name: 'Dialysis Catheters', category: 'Equipment', currentStock: 80, minThreshold: 150, maxCapacity: 500, clinicId: 3 }
]

const mockShippingLogs: ShippingLog[] = [
  { id: 1, clinicId: 1, shipmentDate: '2024-01-20', expectedDelivery: '2024-01-22', status: 'in-transit', carrier: 'FedEx', trackingNumber: 'FX123456789' },
  { id: 2, clinicId: 2, shipmentDate: '2024-01-21', expectedDelivery: '2024-01-25', status: 'in-transit', carrier: 'UPS', trackingNumber: 'UPS987654321' },
  { id: 3, clinicId: 3, shipmentDate: '2024-01-15', expectedDelivery: '2024-01-20', status: 'delayed', carrier: 'USPS', trackingNumber: 'USPS456789123' },
  { id: 4, clinicId: 4, shipmentDate: '2024-01-22', expectedDelivery: '2024-01-26', status: 'in-transit', carrier: 'FedEx', trackingNumber: 'FX987654321' },
  { id: 5, clinicId: 5, shipmentDate: '2024-01-19', expectedDelivery: '2024-01-24', status: 'in-transit', carrier: 'UPS', trackingNumber: 'UPS123456789' }
]

const SupplyChain = () => {
  const [dataType, setDataType] = useState<'clinics' | 'inventory' | 'shipping' | 'alerts'>('clinics')
  const [viewType, setViewType] = useState<'count' | 'distribution'>('count')
  const [clinics] = useState<Clinic[]>(mockClinics)
  const [inventory] = useState<InventoryItem[]>(mockInventory)
  const [shippingLogs] = useState<ShippingLog[]>(mockShippingLogs)

  // Calculate statistics
  const totalClinics = clinics.length
  const criticalClinics = clinics.filter(c => c.status === 'critical').length
  const totalInventoryItems = inventory.length
  const lowStockItems = inventory.filter(i => i.currentStock < i.minThreshold).length
  const activeShipments = shippingLogs.filter(s => s.status === 'in-transit').length

  // Process data for visualization
  const getChartData = () => {
    switch (dataType) {
      case 'clinics':
        const clinicsByStatus = {
          'Normal': clinics.filter(c => c.status === 'normal').length,
          'Low Stock': clinics.filter(c => c.status === 'low').length,
          'Critical': clinics.filter(c => c.status === 'critical').length
        }
        return {
          labels: Object.keys(clinicsByStatus),
          values: Object.values(clinicsByStatus)
        }
      case 'inventory':
        const inventoryByCategory = inventory.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        return {
          labels: Object.keys(inventoryByCategory),
          values: Object.values(inventoryByCategory)
        }
      case 'shipping':
        const shippingByStatus = {
          'In Transit': shippingLogs.filter(s => s.status === 'in-transit').length,
          'Delivered': shippingLogs.filter(s => s.status === 'delivered').length,
          'Delayed': shippingLogs.filter(s => s.status === 'delayed').length
        }
        return {
          labels: Object.keys(shippingByStatus),
          values: Object.values(shippingByStatus)
        }
      default:
        return { labels: [], values: [] }
    }
  }

  const chartData = getChartData()

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 120 // 20px offset from top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Page>
      <SEO
        title="Supply Chain Resilience Tracker"
        description="Track inventory levels at dialysis clinics against shipping logistics data"
      />
      <div className="supply-chain-page">
        <h2 className="dash-title">Supply Chain Resilience Tracker</h2>
        
        <div className="dash-cards">
          <div className="card-single clickable-card" onClick={() => scrollToSection('charts-container')}>
            <div className="card-body">
              <span className="card-icon">📊</span>
              <div>
                <h5>Summary</h5>
                <h4>Analytics</h4>
              </div>
            </div>
            <div className="card-footer">
              <a href="#charts-container" onClick={(e) => { e.preventDefault(); scrollToSection('charts-container') }}></a>
            </div>
          </div>

          <div className="card-single clickable-card" onClick={() => scrollToSection('inventory-container')}>
            <div className="card-body">
              <span className="card-icon">🏥</span>
              <div>
                <h5>Total Clinics</h5>
                <h4>{totalClinics}</h4>
              </div>
            </div>
            <div className="card-footer">
              <a href="#inventory-container" onClick={(e) => { e.preventDefault(); scrollToSection('inventory-container') }}></a>
            </div>
          </div>

          <div className="card-single clickable-card" onClick={() => scrollToSection('alert-statistics')}>
            <div className="card-body">
              <span className="card-icon">!</span>
              <div>
                <h5>Critical Alerts</h5>
                <h4>{criticalClinics + lowStockItems}</h4>
              </div>
            </div>
            <div className="card-footer">
              <a href="#alert-statistics" onClick={(e) => { e.preventDefault(); scrollToSection('alert-statistics') }}></a>
            </div>
          </div>

          <div className="card-single clickable-card" onClick={() => scrollToSection('shipping-logistics')}>
            <div className="card-body">
              <span className="card-icon">📦</span>
              <div>
                <h5>Active Shipments</h5>
                <h4>{activeShipments}</h4>
              </div>
            </div>
            <div className="card-footer">
              <a href="#shipping-logistics" onClick={(e) => { e.preventDefault(); scrollToSection('shipping-logistics') }}></a>
            </div>
          </div>
        </div>
        
        <section className="recent">
          <div className="activity-grid">
            <div className="activity-card" id="inventory-container">
              <h3>Clinic Inventory Status</h3>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Clinic Name</th>
                      <th>Location</th>
                      <th>Inventory Level</th>
                      <th>Status</th>
                      <th>Shipping Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinics.map(clinic => (
                      <tr key={clinic.id}>
                        <td>{clinic.name}</td>
                        <td>{clinic.location}</td>
                        <td>{clinic.inventoryLevel}%</td>
                        <td>
                          <span className={`status-badge ${clinic.status}`}>
                            {clinic.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <span className={`shipping-status ${clinic.shippingStatus}`}>
                            {clinic.shippingStatus.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="insights" id="charts-container">
              <div className="insights-content">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-stats">
                    <div className="stat-item">
                      <label>Total Count:</label>
                      <span id="totalCount">
                        {dataType === 'clinics' ? totalClinics : 
                         dataType === 'inventory' ? totalInventoryItems : 
                         shippingLogs.length}
                      </span>
                    </div>
                    <div className="stat-item">
                      <label>Categories:</label>
                      <span id="typeCount">{chartData.labels.length}</span>
                    </div>
                    <div className="stat-item">
                      <label>Locations:</label>
                      <span id="locationCount">
                        {dataType === 'clinics' ? [...new Set(clinics.map(c => c.location))].length : 
                         dataType === 'inventory' ? [...new Set(inventory.map(i => i.category))].length :
                         [...new Set(shippingLogs.map(s => s.carrier))].length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="reports">
                  <div className="charts">
                    <div className="filters">
                      <div className="filter-group">
                        <label htmlFor="dataType">View Data:</label>
                        <select 
                          id="dataType" 
                          value={dataType}
                          onChange={(e) => setDataType(e.target.value as typeof dataType)}
                        >
                          <option value="clinics">Clinics</option>
                          <option value="inventory">Inventory</option>
                          <option value="shipping">Shipping</option>
                        </select>
                      </div>

                      <div className="filter-group">
                        <label htmlFor="viewType">View Type:</label>
                        <select 
                          id="viewType"
                          value={viewType}
                          onChange={(e) => setViewType(e.target.value as typeof viewType)}
                        >
                          <option value="count">Count</option>
                          <option value="distribution">Distribution</option>
                        </select>
                      </div>
                    </div>
                    <div className="chart-container">
                      {viewType === 'count' ? (
                        <div className="simple-chart">
                          <div className="bar-chart">
                            {chartData.labels.map((label, index) => (
                              <div key={`bar-${label}-${index}`} className="bar-item">
                                <div className="bar-label">{label}</div>
                                <div className="bar-wrapper">
                                  <div 
                                    className="bar" 
                                    style={{ 
                                      width: `${(chartData.values[index] / Math.max(...chartData.values, 1)) * 100}%`,
                                      height: '40px'
                                    }}
                                  >
                                    <span className="bar-value">{chartData.values[index]}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="simple-chart">
                          <div className="pie-chart">
                            {chartData.labels.map((label, index) => {
                              const total = chartData.values.reduce((a, b) => a + b, 0)
                              const percentage = total > 0 ? (chartData.values[index] / total) * 100 : 0
                              return (
                                <div key={`pie-${label}-${index}`} className="pie-item">
                                  <div 
                                    className="pie-segment"
                                    style={{
                                      background: `conic-gradient(from ${index * 120}deg, var(--chart-color-${index % 6}) ${percentage}%, transparent ${percentage}%)`
                                    }}
                                  ></div>
                                  <div className="pie-label">
                                    <span className="pie-color" style={{ backgroundColor: `var(--chart-color-${index % 6})` }}></span>
                                    <span>{label}: {chartData.values[index]} ({percentage.toFixed(1)}%)</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="top-performers" id="alert-statistics">
              <h3>Alert Statistics</h3>
              <div className="performers-card">
                <div className="performer-section">
                  <h4>Critical Inventory Alerts</h4>
                  <ul className="performer-list">
                    {clinics
                      .filter(c => c.status === 'critical' || c.status === 'low')
                      .slice(0, 3)
                      .map(clinic => (
                        <li key={clinic.id}>
                          <span className="alert-icon">🚨</span>
                          <div>
                            <h5>{clinic.name}</h5>
                            <small>{clinic.inventoryLevel}% stock - {clinic.location}</small>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="performer-section">
                  <h4>Shipping Delays</h4>
                  <ul className="performer-list">
                    {shippingLogs
                      .filter(s => s.status === 'delayed' || s.status === 'in-transit')
                      .slice(0, 3)
                      .map(log => {
                        const clinic = clinics.find(c => c.id === log.clinicId)
                        return (
                          <li key={log.id}>
                            <span className="alert-icon">📦</span>
                            <div>
                              <h5>{clinic?.name || 'Unknown Clinic'}</h5>
                              <small>{log.carrier} - {log.status}</small>
                            </div>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shipping-section" id="shipping-logistics">
          <div className="activity-card">
            <h3>Shipping Logistics</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Clinic</th>
                    <th>Carrier</th>
                    <th>Shipment Date</th>
                    <th>Expected Delivery</th>
                    <th>Status</th>
                    <th>Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingLogs.map(log => {
                    const clinic = clinics.find(c => c.id === log.clinicId)
                    return (
                      <tr key={log.id}>
                        <td>{clinic?.name || 'Unknown'}</td>
                        <td>{log.carrier}</td>
                        <td>{new Date(log.shipmentDate).toLocaleDateString()}</td>
                        <td>{new Date(log.expectedDelivery).toLocaleDateString()}</td>
                        <td>
                          <span className={`shipping-status ${log.status}`}>
                            {log.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td>{log.trackingNumber}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}

export default SupplyChain

