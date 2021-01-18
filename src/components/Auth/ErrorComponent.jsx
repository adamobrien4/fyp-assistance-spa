import React, { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function ErrorComponent({ error }) {
  console.log(error)
  return (
    <Typography variant="h6">An Error Occurred: {error.errorCode}</Typography>
  )
}

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired
}
