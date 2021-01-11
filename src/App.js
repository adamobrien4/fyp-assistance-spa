import { useEffect } from "react";
import {
	Switch,
	Route
} from 'react-router-dom';
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

import { loginRequest } from './config/msal-config';

import ErrorComponent from './components/Auth/ErrorComponent';
import Loading from './components/Auth/Loading';

import Suggestion from "./components/Suggestion";
import Welcome from "./components/Welcome";
import StudentAssignment from "./components/StudentAssignment";
import NavBar from "./components/NavBar";
import Button from "@material-ui/core/Button";

function App() {

	const { instance, accounts, inProgress } = useMsal();
	const account = useAccount(accounts[0] || {});

	const authRequest = {
		...loginRequest
	}

	useEffect(() => {
		if (account && inProgress === "none") {
				instance.acquireTokenSilent({
					...loginRequest,
					account: account
				}).then((response) => {
					// User is logged in
				});
		}
	}, [account, inProgress, instance]);

	return (
		<MsalAuthenticationTemplate 
			interactionType={InteractionType.Popup} 
			authenticationRequest={authRequest} 
			errorComponent={ErrorComponent} 
			loadingComponent={Loading}
		>
			<NavBar />
			<Pages />
		</MsalAuthenticationTemplate>
	)
}

function Pages() {

	const { instance } = useMsal();

	return (
		<Switch>
			<Route path='/suggestion'>
				<Suggestion />
			</Route>

			<Route path='/student/assignment'>
				<StudentAssignment />
			</Route>

			<Route path='/logout'>
				{ /* Tidy up logout methodology */ }
				<Button onClick={() => instance.logout({onRedirectNavigate: 'http://localhost:3000/'})} />
			</Route>

			<Route path='/'>
				<Welcome />
			</Route>
		</Switch>
	)
}

export default App;