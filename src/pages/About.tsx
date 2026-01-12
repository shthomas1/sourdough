import './About.css'

const About = () => {
  return (
    <div className="page about-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">About</h1>
          <p className="page-subtitle">
            Replace this content with information about your project or organization.
          </p>
        </div>
        <div className="page-content">
          <section className="content-block">
            <h2 className="section-title">Section One</h2>
            <p className="section-text">
              Your about page content goes here. Customize this section to tell your story.
            </p>
          </section>
          <section className="content-block">
            <h2 className="section-title">Section Two</h2>
            <p className="section-text">
              Add more sections as needed to provide comprehensive information about your project.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
