import React from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedTemplate } from "@azure/msal-react";


export default function NavBar(props) {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{/* TODO: Change which links get diaplyed depending on the user app type*/}
				<AuthenticatedTemplate>
					<li>
						<Link to='/suggestion'>Suggestion</Link>
					</li>
					<li>
						<Link to='/student/assignment'>Assign Students</Link>
					</li>
					<li>
						<Link to='/logout'>Logout</Link>
					</li>
					</AuthenticatedTemplate>
			</ul>
		</nav>
	)
}