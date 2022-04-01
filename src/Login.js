// REACT
import { PropTypes } from 'prop-types'
import React from 'react'
// PACKAGES
import i18n from './i18n'
// HELPERS
import themeableClassName from './helpers/themeableClassName'
// STYLES
import './stylesheets/Login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.usernameInputRef = React.createRef()
    this.passInputRef = React.createRef()

    this.state = {
      error: null
    }
  }

  handleLoginForm(event) {
    event.preventDefault()
    const username = this.usernameInputRef.current.value
    const password = this.passInputRef.current.value

    fetch(`http://aaronhost:8000/auth/authenticate?username=${username}&given_pswd=${password}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then((response) => {
        if (response.result) {
          localStorage.setItem('jwt', response.result)

          window.location.pathname = '/profile'
        } else {
          this.setState({ error: 'login_failed' })
        }
      })
  }

  handleEscPress(e) {
    var { onClose } = this.props

    if (e.key === 'Escape') {
      onClose()
    }
  }

  render() {
    var { error } = this.state
    var { currentTheme, onClose } = this.props

    return (
      <div
        className={themeableClassName('Modal', currentTheme)}
        onKeyDown={(e) => this.handleEscPress(e)}
      >
        <button onClick={onClose} className='Close'>&times;</button>
        <h1>{i18n.t('Sign in')}</h1>
        <form>
          <span className='error-msg'>{i18n.t(error)}</span>
          <input type='text' autoFocus={true} ref={this.usernameInputRef} placeholder={i18n.t('Username')} required />
          <input type='password' ref={this.passInputRef} placeholder={i18n.t('Password')} required />
          <button type='submit' onClick={(e) => this.handleLoginForm(e)}>{i18n.t('Sign in')}</button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  currentTheme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Login