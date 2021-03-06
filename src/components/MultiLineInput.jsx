/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const MultiLineInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant={props.readOnly ? 'standard' : 'outlined'}
      margin="normal"
      inputRef={ref}
      fullWidth
      multiline
      rows={3}
      rowsMax={6}
      inputProps={{ readOnly: props.readOnly }}
      {...props}
    />
  )
})

MultiLineInput.defaultProps = {
  readOnly: false
}

MultiLineInput.propTypes = {
  readOnly: PropTypes.bool
}

export default MultiLineInput
