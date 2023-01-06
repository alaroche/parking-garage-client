import React from 'react'
import { Link } from 'react-router-dom'
import { garagesApi } from '../helpers/garagesApi'
import i18n, { resources } from '../plugins/i18n'
import '../stylesheets/Footer.scss'

export const Footer = (props) => {
  const { setShowLogin } = props

  const handleSignOut = () => {
    garagesApi.delete('/logout')
    localStorage.removeItem('jwt')
    window.location.pathname = '/'
  }

  return (
    <footer>
      <div className='nav-bar'>
        {localStorage.getItem('jwt') ?
          <ul>
            <li><Link to='/admin/garages'>{i18n.t('Garages')}</Link></li>
            <li><Link to='/profile'>{i18n.t('Edit Profile')}</Link></li>
            <li><Link to='/' onClick={handleSignOut}>{i18n.t('Sign out')}</Link></li>
          </ul>
          :
          <button onClick={() => setShowLogin(true)}>{i18n.t('Sign in')}</button>
        }
      </div>
      <ul className='lang-select'>
        <hr />
        {Object.keys(resources).map((lang, i) =>
          <button key={i} onClick={() => i18n.changeLanguage(lang)} data-testid={'button-to-' + lang}>{resources[lang].displayName}</button>
        )}
      </ul>
    </footer>
  )
}
