// REACT
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes, } from 'react-router-dom'
// LAYOUT
import { Footer } from './layout/Footer'
import { Header } from './layout/Header'
// HELPERS
import { ThemeProvider } from './helpers/ThemeContext'
// PAGES
import { Charts } from './pages/Charts'
import { EditProfile } from './pages/EditProfile'
// COMPONENTS
import { Login } from './components/Login'
// STYLES
import './stylesheets/App.scss'

const Routes = () => {
  return useRoutes([
    { path: '*', element: <Charts /> },
    { path: '/:garageId', element: <Charts /> },
    { path: '/profile', element: <EditProfile /> }
  ])
}

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  useTranslation()

  return (
    <ThemeProvider>
      <BrowserRouter>
        {showLogin ?
          <>
            <div id='background-overlay' />
            <Login closeWindow={() => setShowLogin(false)} />
          </>
          :
          ''}
        <Header />
        <Routes />
        <Footer toggleShowLogin={() => setShowLogin(true)} />
      </BrowserRouter>
    </ThemeProvider >
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)