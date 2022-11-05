// REACT
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link, useRoutes } from 'react-router-dom'
// PACKAGES
import IconButton from '@mui/material/IconButton'
import i18n, { resources } from './plugins/i18n'
// HELPERS
import { ThemeContext, ThemeProvider } from './helpers/ThemeContext'
// PAGES
import { DataIndex } from './pages/DataIndex'
import { EditProfile } from './pages/EditProfile'
// COMPONENTS
import { Login } from './components/Login'
// ASSETS
import { Logo } from './logo'
// STYLES
import './stylesheets/Header.scss'
import './stylesheets/Footer.scss'
import './stylesheets/App.scss'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  const LoginFormOverlay = () => {
    return (
      <>
        {showLogin ?
          <>
            <div className='background-overlay' />
            <Login closeWindow={() => setShowLogin(false)} />
          </>
          :
          ''}
      </>
    )
  }

  const Header = () => {
    const { colors, toggleTheme, themeToggleIcon } = useContext(ThemeContext)

    return (
      <header className='header' style={{ borderColor: colors.font, backgroundColor: colors.headerBackground, color: colors.font }}>
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

  const Contents = () => {
    return useRoutes([
      { path: '*', element: <DataIndex /> },
      { path: '/:garageId', element: <DataIndex /> },
      { path: '/profile', element: <EditProfile /> }
    ])
  }

  const Footer = (props) => {
    const { toggleShowLogin } = props
    const { colors } = useContext(ThemeContext)

    const buttonStyle = { color: colors.font }

    const langSelectButtonStyle = {
      borderColor: colors.chartSecondary,
      backgroundColor: colors.headerBackground,
      color: colors.font
    }

    return (
      <footer>
        <div className='nav-bar'>
          {localStorage.getItem('jwt') ?
            <div>
              <Link to='/' style={buttonStyle}>{i18n.t('View Charts')}</Link> | 
              <Link to='/profile'>{i18n.t('Edit Profile')}</Link>
              <Link to='/' onClick={() => localStorage.removeItem('jwt')}>{i18n.t('Sign out')}</Link>
            </div>
            :
            <button style={buttonStyle} onClick={() => toggleShowLogin()}>{i18n.t('Sign in')}</button>
          }
        </div>
        <ul className='lang-select'>
          <hr />
          {Object.keys(resources).map((lang, i) => 
            <button key={i} style={langSelectButtonStyle} onClick={() => i18n.changeLanguage(lang)} data-testid={'button-to-'+lang}>{resources[lang].displayName}</button>
          )}
        </ul>
      </footer>
    )
  }

  useTranslation()

  return (
    <>
      <LoginFormOverlay />
      <Header />
      <Contents />
      <Footer toggleShowLogin={() => setShowLogin(true)} />
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