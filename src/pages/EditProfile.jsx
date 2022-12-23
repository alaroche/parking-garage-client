// REACT
import React, { useContext, useEffect, useState } from 'react'
// PACKAGES
import i18n from '../plugins/i18n'
// HELPERS
import { garagesApi } from '../helpers/garagesApi'
import { ThemeContext } from '../helpers/ThemeContext'
// SNIPPETS
import states from '../lib/usStates'
// STYLES
import '../stylesheets/EditProfile.scss'

export const EditProfile = () => {
  const { theme } = useContext(ThemeContext)

  const jsonWebToken = localStorage.getItem('jwt')
  if (!jsonWebToken) { window.location.pathname = '/' }

  const [emailIsValid, setEmailValid] = useState()

  const [inputs, setInputs] = useState({})

  useEffect(() => {
    garagesApi.get('/garages/1/profile')
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

    garagesApi.put('/garages/1/update?' + inputParams)
      .then(window.location.pathname = '/')
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
        <label style={labelStyle}>{i18n.t('Name of Garage')}</label>
        <input style={inputStyle} name='name' defaultValue={inputs.name} onChange={inputChangeHandler} />
        <label style={labelStyle}>{i18n.t('Address 1')}</label>
        <input style={inputStyle} name='address1' defaultValue={inputs.address1} onChange={inputChangeHandler} required />
        <label style={labelStyle}>{i18n.t('Address 2')}</label>
        <input style={inputStyle} name='address2' defaultValue={inputs.address2} onChange={inputChangeHandler} />
        <label style={labelStyle}>{i18n.t('City')}</label>
        <input style={inputStyle} name='city' defaultValue={inputs.city} onChange={inputChangeHandler} required />
        <label style={labelStyle}>{i18n.t('State')}</label>
        <select style={inputStyle} name='state' value={inputs.state} onChange={inputChangeHandler} required>
          {states().map((state, i) =>
            <option key={i} value={state.abbreviation}>
              {state.name}
            </option>
          )}
        </select>
        <label style={labelStyle}>{i18n.t('Zip Code')}</label>
        <input style={inputStyle} name='zip' defaultValue={inputs.zip} onChange={inputChangeHandler} />
        <label style={labelStyle}>{i18n.t('Email Address')}</label>
        <input style={inputStyle} name='email' defaultValue={inputs.email} type='email' />

        <input style={inputStyle} type='submit' disabled={!emailIsValid} />
      </form>
    )
  }
}