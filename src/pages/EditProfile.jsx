// REACT
import React, { useContext, useEffect, useState } from 'react'
// PACKAGES
import i18n from '../plugins/i18n'
// HELPERS
import { garagesApi } from '../helpers/garagesApi'
import { ThemeContext } from '../helpers/ThemeContext'
// STYLES
import '../stylesheets/EditProfile.scss'

export const EditProfile = () => {
  const { theme } = useContext(ThemeContext)

  if (!localStorage.getItem('jwt')) { window.location.pathname = '/' }

  const [emailIsValid, setEmailValid] = useState()

  const [inputs, setInputs] = useState({})

  useEffect(() => {
    garagesApi.get('/users/profile')
      .then((response) => {
        setEmailValid(true)
        setInputs(response.data)
      })
  }, [])

  const inputChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let inputParams = new URLSearchParams(inputs).toString()

    garagesApi.put('/users/update?' + inputParams)
      .then(window.location.pathname = '/admin/garages')
      .catch(response => setInputs(response.data))
  }

  const labelStyle = {
    color: theme.chartColors.font
  }

  const inputStyle = {}

  if (inputs) {
    return (
      <form
        className='profile-form'
        onSubmit={submitHandler}
      >
        <label style={labelStyle}>{i18n.t('First Name')}</label>
        <input type='text' style={inputStyle} name='first_name' defaultValue={inputs.first_name} onChange={inputChangeHandler} />
        <label style={labelStyle}>{i18n.t('Last Name')}</label>
        <input type='text' style={inputStyle} name='last_name' defaultValue={inputs.last_name} onChange={inputChangeHandler} />
        <label style={labelStyle}>{i18n.t('Email Address')}</label>
        <input type='email' style={inputStyle} name='email' defaultValue={inputs.email} onChange={inputChangeHandler} />

        <input style={inputStyle} type='submit' disabled={!emailIsValid} />
      </form>
    )
  }
}