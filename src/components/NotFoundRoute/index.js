import Header from '../Header'

import './index.css'

const NotFoundRoute = () => (
  <>
    <Header />
    <div className="notFound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="notFound-heading">Page Not Found</h1>
      <p className="notFound-description">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFoundRoute
