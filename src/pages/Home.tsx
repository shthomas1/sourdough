import './Home.css'

const Home = () => {
  return (
    <div className="page home-page">
      <div className="page-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="page-title">Welcome</h1>
            <p className="page-description">
              Your content goes here. This is a starter template ready for customization.
            </p>
          </div>
        </div>
        <div className="content-section">
          <div className="content-grid">
            <div className="content-card">
              <div className="card-icon">🥖</div>
              <h2 className="card-title">Feature One</h2>
              <p className="card-description">
                Replace this content with your own features and information.
              </p>
            </div>
            <div className="content-card">
              <div className="card-icon">🌾</div>
              <h2 className="card-title">Feature Two</h2>
              <p className="card-description">
                Replace this content with your own features and information.
              </p>
            </div>
            <div className="content-card">
              <div className="card-icon">🔥</div>
              <h2 className="card-title">Feature Three</h2>
              <p className="card-description">
                Replace this content with your own features and information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
