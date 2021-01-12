import axios from 'axios'
import { config } from './config/msal-config'
import { getAccessToken } from './msalHelpers'

const axiosConfig = {
  baseURL: config.endpoints.graph,
  timeout: 2500
}

const axiosGraphInstance = axios.create(axiosConfig)

export const setupAxiosInstance = async (inst, acc) => {
  let request = {
    authority:
      `${config.endpoints.login}//${config.auth.tenantId}`,
    scopes: config.auth.scopes.graph,
    account: acc
  }

  const accessToken = await getAccessToken(inst, request)
  if (accessToken) {
    axiosGraphInstance.defaults.headers.common.Authorization = accessToken
  } else {
    delete axiosGraphInstance.defaults.headers.common.Authorization
  }
  return axiosGraphInstance
}

export default axiosGraphInstance
