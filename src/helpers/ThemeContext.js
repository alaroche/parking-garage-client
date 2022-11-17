import React, { createContext, useReducer } from 'react'
import { darkTheme, defaultTheme } from '../lib/themes'

export const ThemeContext = createContext()

const getTheme = () => {
  let theme = defaultTheme
  const themeFromMemory = localStorage.getItem('site-theme')

  if (themeFromMemory) {
    if (themeFromMemory === 'dark') theme = darkTheme
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = darkTheme
  }

  document.body.classList.replace(defaultTheme.name, theme.name)
  return theme
}

const toggleTheme = (theme) => {
  const newTheme = (theme.name === 'default' ? darkTheme : defaultTheme)
  localStorage.setItem('site-theme', newTheme.name)
  document.body.classList.replace(theme.name, newTheme.name)

  return newTheme
}

export const ThemeProvider = (props) => {
  const [theme, toggleThemeDispatch] = useReducer(toggleTheme, getTheme())

  return (<ThemeContext.Provider value={{
    theme: theme,
    toggleTheme: toggleThemeDispatch, themeToggleIcon: theme.themeToggleIcon,
  }}>
    {props.children}
  </ThemeContext.Provider>)
}