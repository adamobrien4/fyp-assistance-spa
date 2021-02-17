import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const BackButton = props => {
  const classes = useStyles()
  const history = useHistory()
  return props.dense ? (
    <IconButton
      className={classes.button}
      onClick={() => {
        history.goBack()
      }}
      {...props}>
      <ArrowBackIosIcon />
    </IconButton>
  ) : (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<ArrowBackIcon />}
      onClick={() => history.goBack()}
      {...props}>
      Go Back
    </Button>
  )
}

BackButton.defaultProps = {
  dense: false
}

BackButton.propTypes = {
  dense: PropTypes.bool
}

export default BackButton
