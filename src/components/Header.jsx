import React from 'react'
import { AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from './NavBar'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}))

export default function Header(props) {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <NavBar />
    </AppBar>
  )
}
