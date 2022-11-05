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

  return theme
}

const toggleTheme = (theme) => {
  const newTheme = (theme.name === 'default' ? darkTheme : defaultTheme)
  localStorage.setItem('site-theme', newTheme.name)

  return newTheme
}

export const ThemeProvider = (props) => {
  const [theme, toggleThemeDispatch] = useReducer(toggleTheme, getTheme())

  document.body.style.backgroundColor = theme.colors.bodyBackground
  document.body.style.color = theme.colors.font

  return (<ThemeContext.Provider value={{
    colors: theme.colors,
    toggleTheme: toggleThemeDispatch, themeToggleIcon: theme.themeToggleIcon,
  }}>
    {props.children}
  </ThemeContext.Provider>)
}