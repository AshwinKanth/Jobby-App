import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <div className="content-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
        </Link>
        <ul className="header-content-container">
          <Link to="/" className="nav-item">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-item">
            <li className="nav-item">Jobs</li>
          </Link>
          <li className="nav-item">
            <button
              className="logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
