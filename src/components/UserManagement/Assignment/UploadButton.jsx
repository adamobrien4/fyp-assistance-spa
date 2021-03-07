import React from 'react'
import PropTypes from 'prop-types'

import PrimaryButton from '../../PrimaryButton'

export default function UploadButton(props) {
  return (
    <PrimaryButton
      disabled={props.disabled}
      loading={props.loading}
      onClick={props.onUpload}>
      Upload All
    </PrimaryButton>
  )
}

UploadButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onUpload: PropTypes.func.isRequired
}
