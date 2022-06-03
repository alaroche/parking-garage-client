// REACT
import React, { useContext } from 'react'
// PACKAGES
import i18n from '../plugins/i18n'
// HELPERS
import { ThemeContext } from '../helpers/ThemeContext'
// STYLESHEETS
import '../stylesheets/Footer.scss'

export const Footer = (props) => {
  const { toggleShowLogin } = props
  const { colors } = useContext(ThemeContext)

  const goToCharts = () => {
    window.location.pathname = '/'
  }

  const goToEditProfile = () => {
    window.location.pathname = '/profile'
  }

  const logout = () => {
    localStorage.removeItem('jwt')

    goToCharts()
  }

  const buttonStyle = {
    color: colors.font
  }

  const langSelectButtonStyle = {
    borderColor: colors.chartSecondary,
    backgroundColor: colors.headerBackground,
    color: colors.font
  }

  return (
    <footer>
      <div className='nav-bar'>
        {localStorage.getItem('jwt') ?
          <div>
            <button style={buttonStyle} onClick={() => goToCharts()}>{i18n.t('View Charts')}</button> |
            <button style={buttonStyle} onClick={() => goToEditProfile()}>{i18n.t('Edit Profile')}</button> |
            <button style={buttonStyle} onClick={() => logout()}>{i18n.t('Sign out')}</button>
          </div>
          :
          <button style={buttonStyle} onClick={() => toggleShowLogin()}>{i18n.t('Sign in')}</button>
        }
      </div>
      <div className='lang-select'>
        <hr />
        <button style={langSelectButtonStyle} onClick={() => i18n.changeLanguage('en-US')} data-testid='button-to-en'>English</button>|
        <button style={langSelectButtonStyle} onClick={() => i18n.changeLanguage('fr-CA')} data-testid='button-to-fr'>Français</button>|
        <button style={langSelectButtonStyle} onClick={() => i18n.changeLanguage('es-MX')} data-testid='button-to-es'>Español</button>
      </div>
    </footer>
  )
}
