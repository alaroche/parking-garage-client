import React, { createContext, useReducer } from 'react'

export const OverlayContext = createContext()

const toggleOverlay = (showOverlay) => {
  return !showOverlay
}

export const OverlayContextProvider = (props) => {
  const [showOverlay, toggleShowOverlayDispatch] = useReducer(toggleOverlay, false)

  return (<OverlayContext.Provider value={{
    showOverlay: showOverlay,
    toggleShowOverlay: toggleShowOverlayDispatch
  }}>
    {props.children}
  </OverlayContext.Provider>)
}