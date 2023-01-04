// REACT
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link, useRoutes } from 'react-router-dom'
// PACKAGES
import IconButton from '@mui/material/IconButton'
import i18n, { resources } from './plugins/i18n'
// HELPERS
import { garagesApi } from './helpers/garagesApi'
import { ThemeContext, ThemeProvider } from './helpers/ThemeContext'
// PAGES
import { Charts } from './pages/MainCharts'
import { EditProfile } from './pages/EditProfile'
// COMPONENTS
import { Login } from './components/Login'
// ASSETS
import { Logo } from './logo'
// STYLES
import './stylesheets/Header.scss'
import './stylesheets/Footer.scss'
import './stylesheets/index.scss'

const Contents = () => {
  return useRoutes([
    { path: '*', element: <Charts /> },
    { path: '/garages/:garageId', element: <Charts /> },
    { path: '/profile', element: <EditProfile /> }
  ])
}

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  useTranslation()

  const LoginFormOverlay = () => {
    return (
      <>
        <div className='background-overlay' />
        <Login closeWindow={() => setShowLogin(false)} />
      </>
    )
  }

  const Header = () => {
    const { theme, themeToggleIcon, toggleTheme } = useContext(ThemeContext)

    return (
      <header className={theme.name}>
        <div className='header__contents'>
          <a href='/' className='header__logo'><Logo /></a>
          <div className='header__title'>{i18n.t('Available Parking')}</div>
        </div>
        <IconButton
          data-testid='theming-button'
          onClick={() => toggleTheme()}
        >
          {themeToggleIcon}
        </IconButton>
      </header>
    )
  }

  const Footer = () => {
    const handleSignOut = () => {
      garagesApi.post('/logout')
      localStorage.removeItem('jwt')
      window.location.pathname = '/'
    }

    return (
      <footer>
        <div className='nav-bar'>
          {localStorage.getItem('jwt') ?
            <ul>
              <li><Link to='/'>{i18n.t('View Charts')}</Link></li>
              <li><Link to='/profile'>{i18n.t('Edit Profile')}</Link></li>
              <li><Link to='/' onClick={handleSignOut}>{i18n.t('Sign out')}</Link></li>
            </ul>
            :
            <button onClick={() => setShowLogin(true)}>{i18n.t('Sign in')}</button>
          }
        </div>
        <ul className='lang-select'>
          <hr />
          {Object.keys(resources).map((lang, i) => 
            <button key={i} onClick={() => i18n.changeLanguage(lang)} data-testid={'button-to-'+lang}>{resources[lang].displayName}</button>
          )}
        </ul>
      </footer>
    )
  }

  return (
    <>
      {showLogin ? <LoginFormOverlay /> : ''}
      <Header />
      <Contents />
      <Footer />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)