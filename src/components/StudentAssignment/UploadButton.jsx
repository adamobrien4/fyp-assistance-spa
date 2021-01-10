import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function UploadButton(props) {
	return (
		<Button variant="outlined" color="primary" onClick={props.onUpload} >
			{props.checkedCount > 0 ? (
				`Upload Selected (${props.checkedCount})`
			) : (
				'Upload All'
			)}
		</Button>
	)
}

UploadButton.propTypes = {
	checkedCount: PropTypes.number.isRequired,
	onUpload: PropTypes.func.isRequired
}

