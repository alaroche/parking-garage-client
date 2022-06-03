// REACT
import React, { useContext, useEffect, useState } from 'react'
// PACKAGES
import axios from 'axios'
import i18n from '../plugins/i18n'
// HELPERS
import { ThemeContext } from '../helpers/ThemeContext'
// SNIPPETS
import states from '../snippets/usStates'
// STYLES
import '../stylesheets/EditProfile.scss'

export const EditProfile = (props) => {
  const { colors } = useContext(ThemeContext)

  const jsonWebToken = localStorage.getItem('jwt')
  if (!jsonWebToken) { window.location.pathname = '/' }

  const [emailIsValid, setEmailValid] = useState()

  const [inputs, setInputs] = useState({})

  const authUser = () => {
    return axios.post('http://aaronhost:8000/auth/authorize', {}, {
      headers: { 'Authorization': `Bearer ${jsonWebToken}` }
    })
  }

  useEffect(() => {
    authUser()
      .then((response) => {
        axios.get(`http://aaronhost:8000/garage/${response.data.garage_id}/profile`)
          .then((response) => {
            setEmailValid(true)
            setInputs(response.data)
          })
      })
  }, [])

  const inputChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const emailValidationHandler = (e) => {
    inputChangeHandler(e)

    const emailRegex = new RegExp(/^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const emailIsValid = emailRegex.test(inputs.email)

    setEmailValid(emailIsValid)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let inputParams = new URLSearchParams(inputs).toString()

    authUser()
      .then((response) => {
        axios.put(`http://aaronhost:8000/garage/${response.data.garage_id}/profile?${inputParams}`, {
          headers: new Headers({ 'Authorization': 'Bearer ' + response.data.jwt })
        })
          .then(window.location.pathname = `/${response.data.garage_id}`)
          .catch(response => setInputs(response.data))
      })
  }

  const labelStyle = {
    color: colors.font
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
        <input style={inputStyle} name='email' defaultValue={inputs.email} onChange={emailValidationHandler} />

        <input style={inputStyle} type='submit' disabled={!emailIsValid} />
      </form>
    )
  }
}