import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function UploadButton(props) {
	return (
		<Button disabled={props.disabled} variant="contained" color="primary" onClick={props.onUpload} >
			Upload All
		</Button>
	)
}

UploadButton.propTypes = {
	disabled: PropTypes.bool.isRequired,
	onUpload: PropTypes.func.isRequired
}

