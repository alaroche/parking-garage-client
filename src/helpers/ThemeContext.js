import React, { createContext, useReducer } from 'react'
import { darkTheme, defaultTheme } from './themes'

export const ThemeContext = createContext()

const themeReducer = (theme) => {
  const newTheme = (theme.name === 'default' ? darkTheme : defaultTheme)
  localStorage.setItem('site-theme', newTheme.name)

  return newTheme
}

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, props.value)

  document.body.style.backgroundColor = state.colors.bodyBackground
  document.body.style.color = state.colors.font

  return (<ThemeContext.Provider value={{
    colors: state.colors,
    dispatch: dispatch,
    themeToggleIcon: state.themeToggleIcon,
  }}>
    {props.children}
  </ThemeContext.Provider>)
}