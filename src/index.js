// REACT
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
// HELPERS
import { ThemeProvider } from './helpers/ThemeContext'
// LAYOUT
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
// PAGES
import { GaragesIndex } from './pages/GaragesIndex'
import { Charts } from './pages/MainCharts'
import { EditProfile } from './pages/EditProfile'
// COMPONENTS
import { Login } from './components/Login'
// STYLES
import './stylesheets/index.scss'

const Contents = () => {
  return useRoutes([
    { path: '*', element: <Charts /> },
    { path: '/profile', element: <EditProfile /> },
    { path: '/garages/:garageId', element: <Charts /> },
    { path: '/admin/garages', element: <GaragesIndex /> }
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

  return (
    <>
      {showLogin ? <LoginFormOverlay /> : ''}
      <Header />
      <Contents />
      <Footer setShowLogin={setShowLogin} />
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