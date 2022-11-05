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

const LoginFormOverlay = (props) => {
  return (
    <>
      <div className='background-overlay' />
      <Login closeWindow={() => props.hideOverlay()} />
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
  const { colors } = useContext(ThemeContext)

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
            <Link to='/'>{i18n.t('View Charts')}</Link> | 
            <Link to='/profile'>{i18n.t('Edit Profile')}</Link>
            <Link to='/' onClick={() => localStorage.removeItem('jwt')}>{i18n.t('Sign out')}</Link>
          </div>
          :
          <button onClick={() => props.showOverlay()}>{i18n.t('Sign in')}</button>
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

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  useTranslation()

  return (
    <>
      {showLogin ? <LoginFormOverlay hideOverlay={() => setShowLogin(false)} /> : ''}
      <Header />
      <Contents />
      <Footer showOverlay={() => setShowLogin(true)} />
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