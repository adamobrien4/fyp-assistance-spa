import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Home } from '@material-ui/icons'
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
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home">
          <Home fontSize="large" />
        </IconButton>
        <NavBar />
      </Toolbar>
    </AppBar>
  )
}
