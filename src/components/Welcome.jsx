import React, { useContext } from 'react'
import { PhaseContext } from '../contexts/PhaseContext'
import { AuthContext } from '../contexts/AuthContext'
import { Can } from '../Auth/Can'

import CountdownToDate from './CountdownToDate'
import { Typography, Container } from '@material-ui/core'

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
      {currentPhase.phase > 0 && currentPhase.phase < 4 ? (
        <>
          <CountdownToDate date={currentPhase.endDate.toString()} />
          <Typography style={{ fontSize: '35px' }} align="center">
            until next phase
          </Typography>
        </>
      ) : null}
    </Container>
  )
}

export default Welcome
