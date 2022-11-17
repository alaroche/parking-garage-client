import React from 'react'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import colors from '../stylesheets/themes.module.scss'

export const darkTheme = {
  name: 'dark',
  chartColors: {
    chartPrimary: colors.pieChartPrimaryDarkMode,
    chartSecondary: colors.pieChartSecondaryDarkMode,
    font: colors.fontDarkMode,
  }
}
darkTheme.themeToggleIcon = <Brightness7Icon htmlColor={colors.fontDarkMode} />

export const defaultTheme = {
  name: 'default',
  chartColors: {
    chartPrimary: colors.pieChartPrimaryDefault,
    chartSecondary: colors.pieChartSecondaryDefault,
    font: colors.fontDefault
  }
}

defaultTheme.themeToggleIcon = <Brightness3Icon htmlColor={colors.fontDefault} />