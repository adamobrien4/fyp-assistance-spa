import React, { useState } from 'react'
import api from '../../../utils/api.axios'

import { Typography, Container, Divider } from '@material-ui/core'

import PrimaryButton from '../../PrimaryButton'
import UploadButton from './UploadButton'
import CSVUploader from '../../CSVUploader'
import UserEmailInputField from './UserEmailInputField'
import PaginatedTable from '../../PaginatedTable'
import BackButton from '../../Buttons/BackButton'

import CollapsableAlert from '../../CollapsableAlert'

const SupervisorAssignment = props => {
  const [currentEmail, setCurrentEmail] = useState('')
  const [supervisors, setSupervisors] = useState([])
  const [includeEmailPrefix, setIncludeEmailPrefix] = useState(true)
  const [alert, setAlert] = useState({})
  const [alertOpen, setAlertOpen] = useState(false)

  const onChange = e => {
    setCurrentEmail(e.target.value)
  }

  const onAdd = e => {
    if (currentEmail.length === 0) {
      setAlert({ message: 'Cannot add empty email!', severity: 'warning' })
      setAlertOpen(true)
      return
    }

    if (
      supervisors.filter(supervisor => supervisor.email === currentEmail)
        .length > 0
    ) {
      setAlert({ message: 'Cannot add duplicate email!', severity: 'warning' })
      setAlertOpen(true)
      return
    }

    // Only apply a email prefix if the checkbox is checked and there is no existing prefix already
    let prefix =
      currentEmail.indexOf('@') === -1 && includeEmailPrefix ? '@ul.ie' : ''
    let email = currentEmail.trim() + prefix

    let re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
      setAlert({ message: 'Cannot add invalid email!', severity: 'error' })
      setAlertOpen(true)
      return
    }

    let supervisorsList = [...supervisors]
    supervisorsList.push({ email: email })
    setCurrentEmail('')
    setSupervisors(supervisorsList)
  }

  const onAddBulk = bulksupervisors => {
    let supervisorsList = [...supervisors]
    for (let supervisor of bulksupervisors) {
      // Skip any empty rows or strings
      if (!supervisor || supervisor.length === 0) {
        return
      }
      supervisorsList.push({
        id: supervisorsList.length,
        email: supervisor
      })
    }
    setSupervisors(supervisorsList)
  }

  const onUpload = async e => {
    if (supervisors.length === 0) {
      return console.log('Please enter some supervisor emails before uploading')
    }

    let body = {
      supervisors: supervisors
    }

    console.log('Uploading: ', body)

    api
      .post('/supervisor/assign', body)
      .then(res => {
        console.log(res.data.supervisors)
        if (res.data.supervisors.length > 0) {
          let supervisorsMap = [...supervisors]
          let emailsMap = supervisors.map(supervisor => supervisor.email)

          for (let supervisor of res.data.supervisors) {
            let index = emailsMap.indexOf(supervisor.email)

            if (index < 0) {
              // Couldn't find supervisor email address returned from api
              continue
            }

            supervisorsMap[index].status = supervisor.status
          }

          let remainingsupervisors = supervisorsMap.filter(
            supervisor =>
              !['assigned', 'exists', undefined].includes(supervisor?.status)
          )
          console.log(remainingsupervisors)
          if (remainingsupervisors.length > 0) {
            setAlert({
              message: 'Could not add the following supervisor emails',
              severity: 'error'
            })
            setAlertOpen(true)
          } else {
            setAlert({
              message: 'Supervisors were added successfully',
              severity: 'success'
            })
            setAlertOpen(true)
          }
          return setSupervisors(remainingsupervisors)
        }
        setSupervisors([])

        setAlert({
          message: 'All supervisors were sucessfully added',
          severity: 'success'
        })

        setAlertOpen(true)
      })
      .catch(err => {
        console.log(err)
        setAlert({
          message: 'An error occurred, please try again',
          severity: 'error'
        })
        setAlertOpen(true)
      })
  }

  const onChangeEmailPrefix = e => {
    setIncludeEmailPrefix(e.target.checked)
  }

  const handleRemove = studentEmail => {
    let filteredSupervisors = supervisors.filter(s => s.email !== studentEmail)
    setSupervisors(filteredSupervisors)
  }

  const endAdornment = includeEmailPrefix ? (
    <span style={{ fontSize: '10px', color: 'gray', marginRight: 10 }}>
      @ul.ie
    </span>
  ) : (
    ''
  )

  return (
    <Container maxWidth="lg">
      <BackButton />
      <Typography variant="h6">Add Supervisors (CSV File)</Typography>
      <CSVUploader onAdd={onAddBulk} />

      <br />
      <Divider />
      <br />

      <Typography variant="h6">Add Supervisor by Email</Typography>
      <UserEmailInputField
        email={currentEmail}
        endAdornment={endAdornment}
        onChange={onChange}
        includeEmailPrefix={includeEmailPrefix}
        onChangeEmailPrefix={onChangeEmailPrefix}
        onAdd={onAdd}
      />

      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />

      <br />

      <PaginatedTable
        value={supervisors}
        removableEntries
        removeEntry={handleRemove}
      />

      <UploadButton disabled={!supervisors.length} onUpload={onUpload} />
      <PrimaryButton
        type="button"
        color="secondary"
        onClick={() => {
          setSupervisors([])
        }}>
        Clear Supervisor List
      </PrimaryButton>
    </Container>
  )
}

export default SupervisorAssignment
