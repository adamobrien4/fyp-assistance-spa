import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Alert from '@material-ui/lab/Alert'
import { Collapse, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const CollapsableAlert = props => {
  // useEffect(() => {
  //   console.log('Open changed')
  //   setTimeout(() => {
  //     props.setOpen(false)
  //     clearTimeout()
  //   }, props.interval || 2000)
  // }, [props.open])

  return (
    <Collapse in={props.open}>
      <Alert
        severity={props.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              props.setOpen(false)
            }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        {props.message}
      </Alert>
    </Collapse>
  )
}

CollapsableAlert.defaultProps = {
  open: false,
  setOpen: () => {},
  message: 'No Message Supplied',
  severity: 'error'
}

CollapsableAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  interval: PropTypes.number
}

export default CollapsableAlert
