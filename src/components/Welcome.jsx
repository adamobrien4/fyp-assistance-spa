import React, { useContext } from 'react'
import { PhaseContext } from '../contexts/PhaseContext'
import { useMsal } from '@azure/msal-react'

import CountdownToDate from './CountdownToDate'
import { Typography, Container } from '@material-ui/core'

const phaseActions = {
  1: ['Supervisors assigned to system', 'Students assigned to system'],
  2: ['Topic suggestions drafting'],
  3: ['TopicList available to be viewed', 'Student proposal drafting'],
  4: ['Student proposal submission', 'Supervisors can respond to proposals']
}

function Welcome() {
  const { currentPhase } = useContext(PhaseContext)

  console.log(currentPhase)

  return (
    <Container maxWidth="lg">
      <Typography style={{ fontSize: '40px' }} align="center">
        Current Phase{' '}
        <span style={{ fontWeight: 'bold' }}>{currentPhase.phase}</span>
      </Typography>
      <CountdownToDate date={currentPhase.endDate.toString()} />
      <Typography style={{ fontSize: '35px' }} align="center">
        until next phase
      </Typography>

      <ul>
        {phaseActions[currentPhase.phase].map(action => (
          <li key={action}>{action}</li>
        ))}
      </ul>

      {currentPhase.phase < 4 ? (
        <>
          <Typography align="center">
            Actions available in next phase
          </Typography>
          <ul>
            {phaseActions[currentPhase.phase + 1].map(action => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </>
      ) : null}
    </Container>
  )
}

export default Welcome
