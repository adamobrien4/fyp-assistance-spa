import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import SelectAllIcon from '@material-ui/icons/SelectAll';

export default function SelectAllButton(props) {
	return (
		<Button variant="outlined" color="primary" startIcon={<SelectAllIcon />} onClick={props.onSelectAll}>{props.checkedCount === props.studentCount ? (
			'Unselect All'
		) : (
			'Select All'
		)}</Button>
	)
}

SelectAllButton.propTypes = {
	checkedCount: PropTypes.number.isRequired,
	studentCount: PropTypes.number.isRequired,
	onSelectAll: PropTypes.func.isRequired
}