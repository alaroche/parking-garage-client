// REACT
import React, { useContext } from 'react'
// PACKAGES
import IconButton from '@mui/material/IconButton'
import i18n from '../plugins/i18n'
// HELPERS
import { ThemeContext } from '../helpers/ThemeContext'
// ASSETS
import { Logo } from '../logo'
// STYLES
import '../stylesheets/Header.scss'

export const Header = (props) => {
  const { colors, dispatch, themeToggleIcon } = useContext(ThemeContext)

  return (
    <header className='header'
      style={{
        borderColor: colors.font,
        backgroundColor: colors.headerBackground,
        color: colors.font
      }}>
      <div className='header__contents'>
        <a href='/' className='header__logo'>
          <Logo />
        </a>
        <div className='header__title'>{i18n.t('Available Parking')}</div>
      </div>
      <IconButton
        data-testid='theming-button'
        onClick={() => dispatch()}
      >
        {themeToggleIcon}
      </IconButton>
    </header>
  )
}
