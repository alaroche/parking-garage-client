import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ProfileInfo = (props) => {
  const [profile, setProfile] = useState()
  const { garageId } = props

  useEffect(() => {
    axios.get(`http://aaronhost:8000/garage/${garageId}/profile`)
      .then(response => setProfile(response.data))
  }, [])

  if (profile) {
    console.log('render ProfileInfo')
    return (
      <address>
        <strong>{profile['name']}</strong>
        <br />{profile['address1']}
        {profile['address2'] ?
          <span>
            <br />{profile['address2']}
          </span>
          :
          ''
        }
        <br />{profile['city'] + ', ' + profile['state'] + ' ' + profile['zip']}
      </address>
    )
  }
}