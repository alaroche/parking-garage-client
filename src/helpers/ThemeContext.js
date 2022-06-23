import React, { createContext, useReducer } from 'react'
import { darkTheme, defaultTheme } from './themes'

export const ThemeContext = createContext()

const themeToggler = (theme) => {
  const newTheme = (theme.name === 'default' ? darkTheme : defaultTheme)
  localStorage.setItem('site-theme', newTheme.name)

  return newTheme
}

export const ThemeProvider = (props) => {
  const [state, toggleTheme] = useReducer(themeToggler, props.theme)

  document.body.style.backgroundColor = state.colors.bodyBackground
  document.body.style.color = state.colors.font

  return (<ThemeContext.Provider value={{
    colors: state.colors,
    toggleTheme: toggleTheme,
    themeToggleIcon: state.themeToggleIcon,
  }}>
    {props.children}
  </ThemeContext.Provider>)
}