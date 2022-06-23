// REACT
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
// LAYOUT
import { Footer } from './layout/Footer'
import { Header } from './layout/Header'
// HELPERS
import { ThemeProvider } from './helpers/ThemeContext'
import { darkTheme, defaultTheme } from './helpers/themes'
// PAGES
import { Charts } from './pages/Charts'
import { EditProfile } from './pages/EditProfile'
// COMPONENTS
import { Login } from './components/Login'
// STYLES
import './stylesheets/App.scss'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  useTranslation()

  let theme = defaultTheme
  const themeFromMemory = localStorage.getItem('site-theme')
  if (themeFromMemory) {
    if (themeFromMemory === 'dark') theme = darkTheme
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = darkTheme
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.colors.backgroundColor }}>
        {showLogin ?
          <div>
            <div className='background-overlay' />
            <Login
              closeWindow={() => setShowLogin(false)}
            />
          </div>
          :
          ''}
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Charts />} />
            <Route path='/:garageId' element={<Charts />} />
            <Route path='/profile' element={<EditProfile />} />
          </Routes>
          <Footer toggleShowLogin={() => setShowLogin(true)} />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)