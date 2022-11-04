import React from 'react'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export const darkTheme = {
  name: 'dark',
  colors: {
    bodyBackground: '#222222',
    chartPrimary: '#334e68',
    chartSecondary: '#102a43',
    font: '#829ab1',
    headerBackground: '#383838',
  },
}
darkTheme.themeToggleIcon = <Brightness7Icon htmlColor={darkTheme.colors.font} />

export const defaultTheme = {
  name: 'default',
  colors: {
    bodyBackground: '#f8f8ff',
    chartPrimary: '#336699',
    chartSecondary: '#87ceeb',
    font: '#233e94',
    headerBackground: '#add8e6',
  },
}
defaultTheme.themeToggleIcon = <Brightness3Icon htmlColor={defaultTheme.colors.font} />