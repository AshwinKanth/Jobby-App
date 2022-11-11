import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

import {Component} from 'react'

class LoginForm extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            <p className="error-msg">{errMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
