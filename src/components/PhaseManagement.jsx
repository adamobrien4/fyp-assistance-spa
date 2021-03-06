import React, { useState, useEffect } from 'react'

import api from '../utils/api.axios'
import moment from 'moment'

import {
  Typography,
  Container,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Table
} from '@material-ui/core'
import { DatePicker } from 'antd'
import PrimaryButton from './PrimaryButton'
import CollapsableAlert from './CollapsableAlert'

const PhaseManagement = props => {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [phases, setPhases] = useState()
  const [alert, setAlert] = useState({
    message: '',
    severity: 'success'
  })
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    api
      .get('/phase/all')
      .then(res => {
        console.log(res)
        let phasesData = res.data.phases.map(p => ({
          phase: p._id,
          date: moment(p.start_date)
        }))
        console.log(phasesData)
        setPhases(phasesData)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onSubmit = () => {
    for (let i = 0; i < phases.length; i++) {
      let p = phases[i]
      if (i < phases.length - 1 && p.date.isAfter(phases[i + 1].date)) {
        setAlert({
          message: `Phase ${p.phase} start date must be before Phase ${
            p.phase + 1
          }'s start date`,
          severity: 'error',
          hidden: false
        })
        setAlertOpen(true)
        return
      }
    }

    let body = phases.map(p => ({
      phase: p.phase,
      date: p.date
    }))

    setUpdating(true)
    api
      .post('/phase/edit', { phases: body })
      .then(res => {
        console.log(res)
        setAlert({
          hidden: false,
          message: 'Phase dates updated',
          severity: 'success'
        })
      })
      .catch(err => {
        console.log(err)
        setAlert({
          message: 'Phase dates not updated',
          severity: 'error'
        })
      })
      .finally(() => {
        setUpdating(false)
        setAlertOpen(true)
      })
  }

  const updatePhase = (value, phase) => {
    console.log('Updating phase', phase, value)
    let temp = [...phases]

    temp[phase - 1].date = value

    console.log(temp)

    setPhases(temp)
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <Container maxWidth="lg">
      <h1>Phase Management</h1>

      <Typography>
        {
          'To select a date, open the date selection input, select your required date, and click the "Ok" button in the bottom right of the input panel.'
        }
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Phase No.</TableCell>
              <TableCell>Phase Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phases.length === 0 ? (
              <TableRow>
                <TableCell>No Phases to display</TableCell>
              </TableRow>
            ) : (
              phases.map(phase => (
                <TableRow key={phase.id}>
                  <TableCell>{phase.phase}</TableCell>
                  <TableCell>
                    <DatePicker
                      defaultValue={phase.date}
                      onOk={val => updatePhase(val, phase.phase)}
                      format="DD / MMM / YY HH:mm"
                      showTime={{ format: 'HH:mm' }}
                      size="large"
                      renderExtraFooter={() =>
                        'Phase will end 5 minutes before following phase start'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PrimaryButton onClick={onSubmit} loading={updating}>
        Update Phase Dates
      </PrimaryButton>
      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />
    </Container>
  )
}

export default PhaseManagement
