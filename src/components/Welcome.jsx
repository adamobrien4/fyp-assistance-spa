import React, { useContext } from 'react'
import { PhaseContext } from '../contexts/PhaseContext'
import { AuthContext } from '../contexts/AuthContext'

import CountdownToDate from './CountdownToDate'
import { Typography, Container, Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  phaseBreakdownTitle: {
    fontSize: '32px'
  },
  phaseTitle: {
    fontSize: '25px'
  }
}))

function Welcome() {
  const { currentPhase } = useContext(PhaseContext)
  const { user } = useContext(AuthContext)
  const classes = useStyles()

  console.log(currentPhase)

  return (
    <Container maxWidth="lg">
      <Typography align="center" variant="h3" style={{ margin: '40px' }}>
        Final Year Project Management System
      </Typography>
      <Typography style={{ margin: '20px' }} align="center">
        Welcome to the FYP Management system.
      </Typography>
      <Typography varint="paragraph"></Typography>
      <Typography style={{ fontSize: '40px' }} align="center">
        Current Phase{' '}
        <span style={{ fontWeight: 'bold' }}>{currentPhase.phase}</span>
      </Typography>
      <CountdownToDate date={currentPhase.endDate.toString()} />
      <Typography style={{ fontSize: '35px' }} align="center">
        until next phase
      </Typography>

      <Divider />

      <Typography align="center" className={classes.phaseBreakdownTitle}>
        Task Breakdown
      </Typography>
      <Typography align="center" className={classes.phaseTitle}>
        Phase 1
      </Typography>
      <Typography align="center">
        Administrator assigns Corrdinator to system. System phases are setup.
      </Typography>
      <Typography align="center" className={classes.phaseTitle}>
        Phase 2
      </Typography>
      <Typography align="center">
        Students and Supervisors are assigned to the system.
      </Typography>
      <Typography align="center" className={classes.phaseTitle}>
        Phase 3
      </Typography>
      <Typography align="center">
        Supervisors can create their topics.
      </Typography>
      <Typography align="center" className={classes.phaseTitle}>
        Phase 4
      </Typography>
      <Typography align="center">
        Students can review topics and send project proposals.
      </Typography>
    </Container>
  )
}

export default Welcome
