// REACT
import React, { useState } from 'react'
// PLUGINS
import axios from 'axios'
// PACKAGES
import i18n from '../plugins/i18n'
// STYLES
import '../stylesheets/Login.scss'

export const Login = (props) => {
  const { closeWindow } = props

  const [data, setData] = useState({ username: '', password: '' })
  const [error, setError] = useState()

  const fieldChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (!data.username || !data.password) return

    axios.post('http://aaronhost:8000/auth/authenticate', data)
      .then((response) => {
        if (response.statusText === 'OK') {
          localStorage.setItem('jwt', response.data.json_web_token)

          window.location.pathname = '/profile'
        } else {
          setError('login_failed')
        }
      })
      .catch(setError('login_failed'))
  }

  return (
    <div
      className='Modal'
      onKeyDown={(e) => e.key === 'Escape' ? closeWindow() : null}
    >
      <button onClick={closeWindow} className='Close'>
        &times;
      </button>
      <h1>{i18n.t('Sign in')}</h1>
      <form onSubmit={submitHandler}>
        <span className='error-msg'>{i18n.t(error)}</span>
        <input type='text' name='username' onChange={fieldChangeHandler} autoFocus={true} placeholder={i18n.t('Username')} required />
        <input type='password' name='password' onChange={fieldChangeHandler} placeholder={i18n.t('Password')} required />
        <input type='submit' value={i18n.t('Sign in')} />
      </form>
    </div>
  )
}