import axios from 'axios'
import { config } from './config/msal-config'
import { getAccessToken } from './msalHelpers'

class axiosGraph {

  axiosConfig = null
  msalInstance = null
  account = null

  constructor() {

  }
}

const axiosConfig = {
  baseURL: config.endpoints.graph,
  timeout: 2500
}
let msalInstance = null
let account = null

const axiosGraphInstance = axios.create(axiosConfig)

axiosGraphInstance.interceptors.request.use((request) => {
  console.log(request)

  let request = {
    authority:
      `${config.endpoints.login}//${config.auth.tenantId}`,
    scopes: config.auth.scopes.graph,
    account: account
  }

  const accessToken = await getAccessToken(inst, request)
  if (accessToken) {
    axiosGraphInstance.defaults.headers.common.Authorization = accessToken
  } else {
    delete axiosGraphInstance.defaults.headers.common.Authorization
  }
  return axiosGraphInstance
  return request
})

export const setupAxiosInstance = (inst, acc) => {
  msalInstance = inst
  account = acc
}

export default axiosGraphInstance
