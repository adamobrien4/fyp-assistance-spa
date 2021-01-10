import React from 'react';
import { useMsal } from "@azure/msal-react";

import { config } from '../config/msal-config';

import { getToken, getProfileData } from '../msalHelpers';

function Welcome() {

	console.log(config);

	const { instance, accounts } = useMsal();

	const account = accounts[0] || null;

	return (
		<div>
			<button onClick={() => alert('Hello World')}>Get Access Token</button>
			<button onClick={() => getToken(instance, account)}>Get Access Token</button>
			<button onClick={() => getProfileData(instance, account)}>Get Profile Data</button>
		</div>
	)
}

export default Welcome;