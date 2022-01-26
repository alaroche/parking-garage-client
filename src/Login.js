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
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  onLoginSuccess(method, response) {
    console.log('logged successfully with ' + method);
  }

  onLoginFail(method, response) {
    console.log('logging failed with ' + method);
    this.setState({
      error: response
    });
  }

  handleLoginForm() {
    const username = this.usernameInputRef.current.value
    const password = this.passInputRef.current.value

    fetch('https://127.0.0.1:8080/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password, // TODO: SSL cert for front and back ends.
      }),
    })
  }

  render() {
    var { currentTheme, onClose } = this.props;

    return (
      <div className={themeableClassName('Modal', currentTheme)}>
        <button onClick={onClose} className='Close'>&times;</button>
        <h1>{i18n.t('Sign in')}</h1>
        <form action='#'>
          <input type='text' autoFocus={true} ref={this.usernameInputRef} placeholder={i18n.t('Username')} required />
          <input type='password' ref={this.passInputRef} placeholder={i18n.t('Password')} required />
          <button type='submit' onClick={() => this.handleLoginForm()}>{i18n.t('Sign in')}</button>
        </form>
      </div>
    );
  }
}

export default Login;