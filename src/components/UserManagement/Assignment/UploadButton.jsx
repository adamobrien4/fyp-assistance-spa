import React from 'react'
import PropTypes from 'prop-types'

import PrimaryButton from '../../PrimaryButton'

export default function UploadButton(props) {
  return (
    <PrimaryButton disabled={props.disabled} onClick={props.onUpload}>
      Upload All
    </PrimaryButton>
  )
}

UploadButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onUpload: PropTypes.func.isRequired
}
