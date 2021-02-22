import React, { useState, useEffect } from 'react'

import api from '../utils/api.axios'
import moment from 'moment'

import {
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

const PhaseManagement = props => {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [phases, setPhases] = useState([])

  useEffect(() => {
    api
      .get('/phase/all')
      .then(res => {
        console.log(res)
        setPhases(res.data.phases)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onCalendarChange = (dates, dateStrings, info, phase) => {
    console.log('Editing phase', phase)
    if (dates.length === 2) {
      let tempPhases = [...phases]
      console.log(tempPhases)
      tempPhases[phase + 1].start_time = dates[1]
      tempPhases[phase + 1].end_time = dates[1].add(2, 'week')

      setPhases(tempPhases)
    }
  }

  const onChange = (date, dateString, phase, type) => {
    let tempPhases = [...phases]

    if (type) {
      tempPhases[phase].end_time = date
    } else {
      tempPhases[phase].start_time = date
    }

    setPhases(tempPhases)
  }

  const onSubmit = () => {
    setUpdating(true)
    api
      .post('/phase/edit', { phases: phases })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <Container maxWidth="lg">
      <h1>Phase Management</h1>

      {phases.map(phase => (
        <span key={phase.phase}>{phase.phase}</span>
      ))}

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Phase No.</TableCell>
              <TableCell>Phase Start</TableCell>
              <TableCell>Phase End</TableCell>
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
                      value={moment(phase.start_time)}
                      onChange={(p1, p2) => onChange(p1, p2, phase.phase, 0)}
                    />
                    {/* <RangePicker
                      defaultValue={[
                        moment(phase.start_time),
                        moment(phase.end_time)
                      ]}
                      onCalendarChange={(v1, v2, v3) =>
                        onCalendarChange(v1, v2, v3, phase.phase)
                      }
                    /> */}
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      value={moment(phase.end_time)}
                      onChange={(p1, p2) => onChange(p1, p2, phase.phase, 1)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PrimaryButton onClick={onSubmit} disabled={updating}>
        Update Phase Dates
      </PrimaryButton>
    </Container>
  )
}

export default PhaseManagement
