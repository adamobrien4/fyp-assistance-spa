import axios from 'axios'
import { config } from '../config/msal-config'

import { getAccessToken } from '../msalHelpers'

let instance = null
let account = null
let isSetup = false

const service = axios.create({
  baseURL: config.endpoints.graph,
  timeout: 4000
})

service.interceptors.request.use(async (req) => {
  console.log('Sending request to Graph')

  let request = {
    authority: `${config.endpoints.login}/${config.auth.tenantId}`,
    scopes: config.auth.scopes.graph,
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

export const setup = (inst, acc) => {
  if (isSetup) {
    return
  }
  instance = inst
  account = acc
  isSetup = true
}

export const printDetails = () => {
  console.log(instance, account)
}

export default service
