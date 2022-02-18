import React from 'react';
import i18n from './i18n';
import themeableClassName from './helpers/themeableClassName';
import './stylesheets/Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.usernameInputRef = React.createRef();
    this.passInputRef = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      showModal: false,
    };
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false, error: null });
  }

  handleLoginForm() {
    const username = this.usernameInputRef.current.value
    const password = this.passInputRef.current.value

    fetch(`http://aaronhost:8000/auth?username=${username}&given_pswd=${password}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(response => this.handleAuthResponse(response))
  }

  handleAuthResponse(response) {
    if (response.isError) {
      this.setState({ error: response.result })
    } else {
      var json_web_token = response.result
      var request = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + json_web_token
        }),
      }

      fetch('http://aaronhost:8000/auth_validate', request)
        .then(response => response.json())
        .then(response => localStorage.setItem('username', response['username']))

      this.setState({ error: null })
    }
  }

  render() {
    var { error } = this.state;
    var { currentTheme, onClose } = this.props;

    return (
      <div className={themeableClassName('Modal', currentTheme)}>
        <button onClick={onClose} className='Close'>&times;</button>
        <h1>{i18n.t('Sign in')}</h1>
        <form action='#'>
          <span className='error-msg'>{error}</span>
          <input type='text' autoFocus={true} ref={this.usernameInputRef} placeholder={i18n.t('Username')} required />
          <input type='password' ref={this.passInputRef} placeholder={i18n.t('Password')} required />
          <button type='submit' onClick={() => this.handleLoginForm()}>{i18n.t('Sign in')}</button>
        </form>
      </div>
    );
  }
}

export default Login;