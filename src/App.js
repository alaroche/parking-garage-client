// REACT
import React from 'react'
import { defaults } from 'react-chartjs-2'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { withTranslation } from 'react-i18next'
// PACKAGES
import { ThemeProvider } from '@mui/material/styles'
// LAYOUT
import Footer from './layout/Footer'
import Header from './layout/Header'
// PAGES
import Charts from './pages/Charts'
import EditProfile from './pages/EditProfile'
// COMPONENTS
import Login from './components/Login'
// STYLES
import { darkTheme, defaultTheme } from './helpers/themes'
import './stylesheets/App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleThemeToggle = this.handleThemeToggle.bind(this)

    var theme = defaultTheme
    var themeFromMemory = localStorage.getItem('site-theme')

    if (themeFromMemory) {
      theme = themeFromMemory !== 'dark-mode' ? defaultTheme : darkTheme
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = darkTheme
    }

    document.body.classList.add(theme.className)

    this.state = {
      currentTheme: theme,
      showLogin: false
    }
  }

  handleThemeToggle = () => {
    defaults.transitions = false
    var { currentTheme } = this.state;

    var newTheme = currentTheme === defaultTheme ? darkTheme : defaultTheme

    document.body.classList.remove(currentTheme.className)
    document.body.classList.add(newTheme.className)
    localStorage.setItem('site-theme', newTheme.className)

    this.setState({ currentTheme: newTheme })
  }

  toggleShowLogin = () => {
    var { showLogin } = this.state

    this.setState({ showLogin: !showLogin })
  }

  render() {
    var { currentTheme, showLogin } = this.state

    return (
      <ThemeProvider theme={currentTheme}>
        {showLogin ?
          <div>
            <div className='background-overlay' />
            <Login
              currentTheme={currentTheme}
              onClose={() => this.toggleShowLogin()}
            />
          </div>
          :
          ''}
        <Header handleThemeToggle={() => this.handleThemeToggle(this)} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Charts currentTheme={currentTheme} />} />
            <Route path='/:garageId' element={<Charts currentTheme={currentTheme} />} />
            <Route path='/profile' element={<EditProfile currentTheme={currentTheme} />} />
          </Routes>
          <Footer toggleShowLogin={this.toggleShowLogin} />
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default withTranslation()(App)