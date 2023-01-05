import React, { useContext } from 'react'
import { ThemeContext } from '../helpers/ThemeContext'
import IconButton from '@mui/material/IconButton'
import i18n from '../plugins/i18n'
import { Logo } from '../logo'
import '../stylesheets/Header.scss'

export const Header = () => {
  const { theme, themeToggleIcon, toggleTheme } = useContext(ThemeContext)

  return (
    <header className={theme.name}>
      <div className='header__contents'>
        <a href='/' className='header__logo'><Logo /></a>
        <div className='header__title'>{i18n.t('Available Parking')}</div>
      </div>
      <IconButton
        data-testid='theming-button'
        onClick={() => toggleTheme()}
      >
        {themeToggleIcon}
      </IconButton>
    </header>
  )
}