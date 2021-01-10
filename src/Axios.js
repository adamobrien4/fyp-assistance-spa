import axios from 'axios';
import { config } from './config/msal-config';
import { getAccessToken } from './msalHelpers';

const axiosConfig = {
	baseURL: config.endpoints.graph,
	timeout:2500
}

const axiosConfigured = axios.create(axiosConfig);

axiosConfigured.interceptors.request.use(request => {

	// get instance and do the token stuff there
  
  request.headers.common['Authorization'] = token;

  return request
})

var setupAxiosInstance = async (inst, acc) => {

	let request = {
		authority:
			`${config.endpoints.login}/${config.auth.tenantId}`,
		scopes: config.auth.scopes,
		account: acc,
	};

	var token = await getAccessToken(inst, request);
	if (token) {
		axiosConfigured.defaults.headers.common['Authorization'] = token;
	} else {
		delete axiosConfigured.defaults.headers.common['Authorization'];
	}
	console.log('Setup');
	return axiosConfigured;
}

export default axiosConfigured;