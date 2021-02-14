import React, { useState } from 'react'
import api from '../../../utils/api.axios'

import { Typography, Container, IconButton, Collapse } from '@material-ui/core'

import Alert from '@material-ui/lab/Alert'
import { Close as CloseIcon } from '@material-ui/icons'

import PrimaryButton from '../../PrimaryButton'
import UploadButton from './UploadButton'
import CSVUploader from '../../CSVUploader'
import UserEmailInputField from './UserEmailInputField'
import PaginatedTable from '../../PaginatedTable'

const SupervisorAssignment = props => {
  const [currentEmail, setCurrentEmail] = useState('')
  const [supervisors, setsupervisors] = useState([])
  const [includeEmailPrefix, setIncludeEmailPrefix] = useState(true)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Alert Message')

  const onChange = e => {
    setCurrentEmail(e.target.value)
  }

  const onAdd = e => {
    if (currentEmail.length === 0) {
      setAlertMessage('Cannot add empty email!')
      setAlertOpen(true)
      return
    }

    if (
      supervisors.filter(supervisor => supervisor.email === currentEmail)
        .length > 0
    ) {
      setAlertMessage('Cannot add duplicate email!')
      setAlertOpen(true)
      return
    }

    // Only apply a email prefix if the checkbox is checked and there is no existing prefix already
    let prefix =
      currentEmail.indexOf('@') === -1 && includeEmailPrefix ? '@ul.ie' : ''
    let email = currentEmail.trim() + prefix

    let re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
      setAlertMessage('Cannot add invalid email!')
      setAlertOpen(true)
      return
    }

    let supervisorsList = [...supervisors]
    supervisorsList.push({ email: email })
    setCurrentEmail('')
    setsupervisors(supervisorsList)
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
    setsupervisors(supervisorsList)
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
            setAlertMessage(
              'The following supervisor email addresses could not be linked to a supervisor'
            )
            setAlertOpen(true)
          }
          return setsupervisors(remainingsupervisors)
        }
        setsupervisors([])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChangeEmailPrefix = e => {
    setIncludeEmailPrefix(e.target.checked)
  }

  const endAdornment = includeEmailPrefix ? (
    <span style={{ fontSize: '10px', color: 'gray', marginRight: 10 }}>
      @ul.ie
    </span>
  ) : (
    ''
  )

  return (
    <Container>
      <Typography variant="h6">Upload CSV file</Typography>
      <CSVUploader onAdd={onAddBulk} />
      <Container maxWidth="md">
        <Typography variant="h6">Add Individual Supervisor</Typography>
        <UserEmailInputField
          email={currentEmail}
          endAdornment={endAdornment}
          onChange={onChange}
          includeEmailPrefix={includeEmailPrefix}
          onChangeEmailPrefix={onChangeEmailPrefix}
          onAdd={onAdd}
        />

        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false)
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            {alertMessage}
          </Alert>
        </Collapse>

        <br />

        <PaginatedTable value={supervisors} />

        <UploadButton disabled={!supervisors.length} onUpload={onUpload} />
        <PrimaryButton
          type="text"
          color="secondary"
          onClick={() => {
            setsupervisors([])
          }}>
          Clear Supervisor List
        </PrimaryButton>
      </Container>
    </Container>
  )
}

export default SupervisorAssignment
