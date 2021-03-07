/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const Input = forwardRef((props, ref) => {
  return (
    <TextField
      variant={props.readOnly ? 'standard' : 'outlined'}
      margin="normal"
      inputRef={ref}
      fullWidth
      inputProps={{ readOnly: props.readOnly }}
      {...props}
    />
  )
})

Input.defaultProps = {
  readOnly: false
}

Input.propTypes = {
  readOnly: PropTypes.bool
}

export default Input
