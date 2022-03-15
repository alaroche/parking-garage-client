// REACT
import React from 'react';
import { defaults } from 'react-chartjs-2';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { withCookies } from 'react-cookie';
import { withTranslation } from 'react-i18next';
// PACKAGES
import { ThemeProvider } from '@mui/material/styles';
// LAYOUT
import Footer from './layout/Footer';
import Header from './layout/Header';
// COMPONENTS
import Charts from './Charts';
import EditProfile from './EditProfile';
import Login from './Login';
import { darkTheme, defaultTheme } from './helpers/themes';
// STYLES
import './stylesheets/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleThemeToggle = this.handleThemeToggle.bind(this)

    var theme
    var themeFromCookie = this.props.cookies.get('pg-theme')

    if (themeFromCookie) {
      theme = themeFromCookie !== 'dark-mode' ? defaultTheme : darkTheme;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = darkTheme;
    } else {
      theme = defaultTheme;
    }

    document.body.classList.add(theme.className);

    this.state = {
      currentTheme: theme,
      loginError: null,
      showLogin: false
    }
  }

  setDefaultTheme = () => {
    const { cookies } = this.props;

    document.body.classList.remove(darkTheme.className)
    cookies.set('pg-theme', defaultTheme.className, { path: '/' });

    this.setState({ currentTheme: defaultTheme })
  }

  setDarkTheme = () => {
    const { cookies } = this.props;

    document.body.classList.add(darkTheme.className);
    cookies.set('pg-theme', darkTheme.className, { path: '/' });

    this.setState({ currentTheme: darkTheme })
  }

  handleSuccessfulAuth = (json_web_token, username) => {
    localStorage.setItem('jwt', json_web_token)
    localStorage.setItem('username', username)

    window.location.pathname = '/user-profile'
  }

  handleThemeToggle = () => {
    var { cookies } = this.props;
    defaults.transitions = false;

    cookies.get('pg-theme') === 'dark-mode' ? this.setDefaultTheme() : this.setDarkTheme();
  }

  toggleShowLogin = () => {
    var { showLogin } = this.state;

    this.setState({ showLogin: !showLogin });
  }

  renderLoginModal() {
    var { currentTheme } = this.state;

    return (
      <div>
        <div className='background-overlay' />
        <Login
          currentTheme={currentTheme}
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          onClose={() => this.toggleShowLogin()}
        />
      </div>
    )
  }

  render() {
    var { currentTheme, showLogin } = this.state;

    return (
      <ThemeProvider theme={currentTheme}>
        {showLogin ? this.renderLoginModal() : ''}
        <Header handleThemeToggle={() => this.handleThemeToggle(this)} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Charts currentTheme={currentTheme} />} />
            <Route path="/user-profile" element={<EditProfile />} />
          </Routes>
          <Footer toggleShowLogin={this.toggleShowLogin} />
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default withTranslation()(withCookies(App));