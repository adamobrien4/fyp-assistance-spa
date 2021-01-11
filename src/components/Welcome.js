import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function Welcome() {

	// const [instance, accounts] = useMsal();

	return (
		<div>
			<AuthenticatedTemplate>
				{/* <button onClick={() => alert('Hello World')}>Get Access Token</button>
				<button onClick={() => getToken(instance, accounts[0])}>Get Access Token</button>
				<button onClick={() => getProfileData(instance, accounts[0])}>Get Profile Data</button> */}
				<h1>You are logged in</h1>
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<h4>Plesae login</h4>
			</UnauthenticatedTemplate>
		</div>
	)
}

export default Welcome;