// REACT
import React, { useContext, useState } from 'react'
// PLUGINS
import axios from 'axios'
// PACKAGES
import i18n from '../plugins/i18n'
// HELPERS
import { ThemeContext } from '../helpers/ThemeContext'
// STYLES
import '../stylesheets/Login.scss'

export const Login = (props) => {
  const { closeWindow } = props

  const [data, setData] = useState({ username: '', password: '' })
  const [error, setError] = useState()

  const { colors } = useContext(ThemeContext)

  const fieldChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (!data.username || !data.password) return

    // TODO: No query params
    // Common context?
    // https://axios-http.com/docs/config_defaults
    axios.post(`http://aaronhost:8000/auth/authenticate?username=${data.username}&password=${data.password}`)
      .then((response) => {
        localStorage.setItem('jwt', response.data.json_web_token)

        window.location.pathname = '/profile'
      })
      .catch(setError('login_failed'))
  }

  const escPressHandler = (e) => {
    if (e.key === 'Escape') closeWindow()
  }

  return (
    <div
      className='Modal'
      onKeyDown={escPressHandler}
      style={{
        borderColor: colors.chartPrimary,
        backgroundColor: colors.headerBackground
      }}
    >
      <button onClick={closeWindow} className='Close'>
        &times;
      </button>
      <h1 style={{ color: colors.font }}>{i18n.t('Sign in')}</h1>
      <form onSubmit={submitHandler}>
        <span className='error-msg'>{i18n.t(error)}</span>
        <input type='text' name='username' onChange={fieldChangeHandler} autoFocus={true} placeholder={i18n.t('Username')} required />
        <input type='password' name='password' onChange={fieldChangeHandler} placeholder={i18n.t('Password')} required />
        <input type='submit' value={i18n.t('Sign in')} />
      </form>
    </div>
  )
}