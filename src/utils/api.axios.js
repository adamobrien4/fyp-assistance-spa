import axios from 'axios'
import { config } from '../config/msal-config'

import { getAccessToken } from '../msalHelpers'

let instance = null
let account = null
let isSetup = false

const service = axios.create({
  baseURL: config.endpoints.customApi,
  timeout: 4000
})

service.interceptors.request.use(async req => {
  console.log('Sending request')

  console.log(req)

  let request = {
    authority: `${config.endpoints.login}/${config.auth.tenantId}`,
    scopes: config.auth.scopes.customApi,
    account: account
  }

  const accessToken = await getAccessToken(instance, request)
  if (accessToken) {
    req.headers = {
      Authorization: `Bearer ${accessToken}`
    }
  } else {
    delete req.headers.Authorization
  }

  return req
})

export const setup = async (inst, acc) => {
  return new Promise((resolve, reject) => {
    if (isSetup) {
      return resolve('Is setup')
    }

    instance = inst
    account = acc

    // Check that API is available
    service
      .get('/ping', { timeout: 2000 })
      .then(() => {
        isSetup = true
        return resolve('setup complete')
      })
      .catch(err => {
        // Timeout
        console.log(err)
        console.log('Timed Out: Server not Available')
        return reject(new Error('Timed Out: Server not Available'))
      })
  })
}

export const printDetails = () => {
  console.log(instance, account)
}

export default service
