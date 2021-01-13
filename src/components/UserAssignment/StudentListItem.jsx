import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText'

export default function StudentListItem(props) {
	return (
		<ListItem key={props.student} button onClick={() => props.handleToggle(props.student)}>
			<Checkbox
				edge="start"
				disableRipple
				checked={props.checked.indexOf(props.student) !== -1}
				/>
				<ListItemText primary={props.student} />
		</ListItem>
	)
}

StudentListItem.propTypes = {
	student: PropTypes.string.isRequired,
	checked: PropTypes.array.isRequired,
	handleToggle: PropTypes.func.isRequired
}