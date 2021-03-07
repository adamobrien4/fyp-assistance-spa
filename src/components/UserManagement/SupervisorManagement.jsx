import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Typography } from '@material-ui/core'

import api from '../../utils/api.axios'

import Input from '../Input'
import PrimaryButton from '../PrimaryButton'
import CollapsableAlert from '../CollapsableAlert'

import UserTable from './UserTable'

const SupervisorManagement = props => {
  const [supervisors, setSupervisors] = useState([])
  const [visableSupervisors, setVisableSupervisors] = useState([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState('')
  const [alert, setAlert] = useState({
    message: 'No Message Supplied',
    severity: 'info'
  })
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    refreshSupervisorList()
  }, [])

  const refreshSupervisorList = () => {
    // Get supervisors from DB
    api
      .get('/supervisor')
      .then(res => {
        console.log(res)
        setSupervisors(res.data.supervisors)
        setVisableSupervisors(res.data.supervisors)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSearch = e => {
    if (e.target.value === '') {
      return setVisableSupervisors(supervisors)
    }
    // TODO: Search not working for inside sentence search
    let searched = supervisors.filter(
      supervisor =>
        !supervisor.email.indexOf(e.target.value.trim().toLowerCase())
    )
    setVisableSupervisors(searched)
  }

  const handleRemove = id => {
    console.log('removing supervisor w/ id', id)

    setRemoving(id)
    api
      .post('/supervisor/delete', { supervisorId: id })
      .then(res => {
        console.log(res)
        refreshSupervisorList()
      })
      .catch(err => {
        console.log(err)
        setAlert({
          message: 'Could not remove Supervisor',
          severity: 'error'
        })
        setAlertOpen(true)
      })
      .finally(() => {
        setRemoving(null)
      })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Container maxwidth="md">
      <Typography variant="h4" align="center">
        Supervisor Management
      </Typography>

      <Input label="Search" onChange={handleSearch} />

      <UserTable
        values={visableSupervisors}
        remove={handleRemove}
        removing={removing}
      />

      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />

      <Link to="/supervisor/assign">
        <PrimaryButton>Go to Assign Supervisors Page</PrimaryButton>
      </Link>
    </Container>
  )
}

export default SupervisorManagement
