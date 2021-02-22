/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'

const MultiLineInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      multiline
      rows={3}
      rowsMax={6}
      inputProps={{ readOnly: props.readOnly === true }}
      {...props}
    />
  )
})

export default MultiLineInput
