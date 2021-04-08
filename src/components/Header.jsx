import React from 'react'
import PropTypes from 'prop-types'
import { AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from './Navbar/NavBar'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}))

export default function Header(props) {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <NavBar
        notifications={props.notifications}
        setNotifications={props.setNotifications}
      />
    </AppBar>
  )
}

Header.propTypes = {
  notifications: PropTypes.array.isRequired,
  setNotifications: PropTypes.func.isRequired
}
