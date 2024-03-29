import axios from 'axios'
import { config } from './config/msal-config'

export const getProfileData = (instance, account) => {
  const request = {
    authority: `${config.endpoints.login}/${config.auth.tenantId}`,
    scopes: config.auth.scopes,
    account: account
  }

  getTokenSilent(instance, request)
    .then(resp => {
      console.log(resp.accessToken)
      const bearer = `Bearer ${resp.accessToken}`

      const options = {
        headers: {
          Authorization: bearer
        }
      }
      axios
        .get(`${config.endpoints.graph}/me`, options)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.log(err))
}

export const getTokenSilent = (instance, request) => {
  return instance.acquireTokenSilent(request).catch(error => {
    console.warn('silent token acquisition fails. acquiring token using popup')
    console.log(error)
    if (error.name === 'InteractionRequiredAuthError') {
      // fallback to interaction when silent call fails
      return instance
        .acquireTokenPopup(request)
        .then(tokenResponse => {
          console.log(tokenResponse)
          return tokenResponse
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      console.warn(error)
    }
  })
}

export const getAccessToken = async (instance, request) => {
  const silentTokenResponse = await instance
    .acquireTokenSilent(request)
    .catch(async err => {
      console.log('Interaction Required for access token')
      if (err.name === 'InteractionRequiredAuthError') {
        const tokenResponse = await instance
          .acquireTokenPopup(request)
          .catch(error => {
            console.error(error)
          })
        return tokenResponse.accessToken
      }

      console.log('Error getting access token: ', err)
    })

  if (silentTokenResponse && silentTokenResponse.accessToken) {
    return silentTokenResponse.accessToken
  } else {
    console.log('Silent Error: ', silentTokenResponse)
  }
}

export const getUserProfileByEmail = (instance, account, email) => {
  const request = {
    authority: `${config.endpoints.login}/${config.auth.tenantId}`,
    scopes: config.auth.scopes.concat('User.Read.All'),
    account: account
  }

  getTokenSilent(instance, request)
    .then(res => {
      const bearer = `Bearer ${res.accessToken}`

      const options = {
        headers: {
          Authorization: bearer
        }
      }

      axios
        .get(`${config.endpoints.graph}/users/${email}`, options)
        .then(response => {
          console.log(response.data.id)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const assignRoleToUser = (instance, account, subjectUserId, roleId) => {
  const request = {
    authority: `${config.endpoints.login}/${config.auth.tenantId}`,
    scopes: config.auth.scopes.concat([
      'Directory.AccessAsUser.All',
      'Directory.ReadWrite.All',
      'Directory.Read.All'
    ]),
    account: account
  }

  getTokenSilent(instance, request)
    .then(res => {
      const bearer = `Bearer ${res.accessToken}`

      const options = {
        headers: {
          Authorization: bearer
        }
      }

      const url = `${config.endpoints.graph}/users/${subjectUserId}/appRoleAssignments`
      const body = {
        principalId: subjectUserId,
        principalType: 'User',
        resourceId: config.auth.applicationResourceId,
        appRoleId: roleId
      }

      axios
        .post(url, body, options)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const getToken = (instance, account) => {
  console.log(config)
  const request = {
    authority: `${config.endpoints.login}/${config.auth.tenantId}`,
    scopes: config.auth.scopes,
    account: account
  }

  getTokenSilent(instance, request)
    .then(res => {
      console.log(res.accessToken)
    })
    .catch(err => {
      console.log(err)
    })
}
