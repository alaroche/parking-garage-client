// REACT
import { PropTypes } from 'prop-types'
import React from 'react'
// PACKAGES
import i18n from './i18n'
// HELPERS
import { authWithJwt } from './helpers/auth'
import themeableClassName from './helpers/themeableClassName'
// SNIPPETS
import states from './snippets/usStates'
// STYLES
import './stylesheets/EditProfile.scss'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailIsValid: false,
      error: null,
      inputs: [],
      isLoaded: false,
    }
  }

  async componentDidMount() {
    let user = await authWithJwt()

    if (!user.garage_id) {
      window.location.pathname = '/'
    }

    fetch(`http://aaronhost:8000/garage/${user.garage_id}/profile`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(
        (response) => {
          this.setState({
            emailIsValid: true,
            inputs: response,
            isLoaded: true
          })
        },
      )
  }

  handleEmailValidation = (event) => {
    let emailRegex = new RegExp(/^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    var emailIsValid = emailRegex.test(event.target.value)

    this.setState({ emailIsValid: emailIsValid })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    var jsonWebToken = localStorage.getItem('jwt')

    var inputs = {}
    var inputParams

    for (var input of event.target) {
      inputs[input['name']] = input['value']
    }

    inputParams = new URLSearchParams(inputs).toString()

    fetch(`http://aaronhost:8000/garage/profile?${inputParams}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jsonWebToken
      }),
    })
      .then(response => response.json())

    window.location.pathname = '/'
  }

  render() {
    var { emailIsValid, error, isLoaded, inputs } = this.state
    var { currentTheme } = this.props

    if (!error && isLoaded) {
      return (
        <form
          className={themeableClassName('profile-form', currentTheme)}
          onSubmit={this.handleSubmit}
        >
          <label>{i18n.t('Name of Garage')}</label>
          <input name='garage_name' defaultValue={inputs['name']} />
          <label>{i18n.t('Address 1')}</label>
          <input name='address1' defaultValue={inputs['address1']} required />
          <label>{i18n.t('Address 2')}</label>
          <input name='address2' defaultValue={inputs['address2']} />
          <label>{i18n.t('City')}</label>
          <input name='city' defaultValue={inputs['city']} required />
          <label>{i18n.t('State')}</label>
          <select name='state' defaultValue={inputs['state']} required>
            {states().map((state, i) =>
              <option
                key={i}
                value={state.abbreviation}
              >
                {state.name}
              </option>
            )}
          </select>
          <label>{i18n.t('Zip Code')}</label>
          <input name='zip' defaultValue={inputs['zip']} />
          <label>{i18n.t('Email Address')}</label>
          <input name='email' defaultValue={inputs['email']} onChange={this.handleEmailValidation} />

          <input type='submit' disabled={!emailIsValid} />
        </form>
      )
    } else {
      return (
        <div className='rendering-msg'>
          ({error && error.message ? i18n.t('Service unavailable') : i18n.t('Loading...')})
        </div>
      )
    }
  }
}

EditProfile.propTypes = {
  currentTheme: PropTypes.object.isRequired
}

export default EditProfile