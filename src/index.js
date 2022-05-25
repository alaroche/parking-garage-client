// REACT
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { defaults } from 'react-chartjs-2'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
// import { withTranslation } from 'react-i18next'
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

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [showLogin, setShowLogin] = useState(false)

  const setTheme = (theme) => {
    document.body.classList.add(theme.className)
    localStorage.setItem('site-theme', theme.className)

    setCurrentTheme(theme)
  }

  const determineTheme = () => {
    const themeFromMemory = localStorage.getItem('site-theme')
    let theme = defaultTheme

    if (themeFromMemory) {
      theme = themeFromMemory !== 'dark-mode' ? defaultTheme : darkTheme
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = darkTheme
    }

    setTheme(theme)
  }

  useEffect(() => determineTheme())

  const handleThemeToggle = () => {
    defaults.transitions = false
    var newTheme = currentTheme === defaultTheme ? darkTheme : defaultTheme

    document.body.classList.remove(currentTheme.className)

    setTheme(newTheme)
  }

  return (
    <ThemeProvider theme={currentTheme}>
      {showLogin ?
        <div>
          <div className='background-overlay' />
          <Login
            currentTheme={currentTheme}
            onClose={() => setShowLogin(!showLogin)}
          />
        </div>
        :
        ''}
      <Header handleThemeToggle={() => handleThemeToggle} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Charts currentTheme={currentTheme} />} />
          <Route path='/:garageId' element={<Charts currentTheme={currentTheme} />} />
          <Route path='/profile' element={<EditProfile currentTheme={currentTheme} />} />
        </Routes>
        <Footer toggleShowLogin={() => setShowLogin(!showLogin)} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
//export default withTranslation()(App)
root.render(<App />)