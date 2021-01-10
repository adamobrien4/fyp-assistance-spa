import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/suggestion'>Suggestion</Link>
				</li>
				<li>
					<Link to='/student/assignment'>Assign Students</Link>
				</li>
			</ul>
		</nav>
	)
}