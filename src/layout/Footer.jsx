// REACT
import React, { useContext } from 'react'
// PACKAGES
import i18n, { resources } from '../plugins/i18n'
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

  console.log('resources', resources['en-US'].name)

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
        {Object.keys(resources).map((lang, i) => {
          return <button lang={lang}
            key={i}
            style={langSelectButtonStyle}
            onClick={() => i18n.changeLanguage(lang)}
            data-testid={'button-to-' + lang}>
            {resources[lang].name}
          </button>
        })}
      </div>
    </footer>
  )
}
