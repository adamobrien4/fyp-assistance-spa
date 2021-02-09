import React, { useState } from 'react'
import { config } from '../../config/msal-config'

import Typography from '@material-ui/core/Typography'
import { Container, IconButton, Collapse } from '@material-ui/core'
import PrimaryButton from '../PrimaryButton'
import { DataGrid } from '@material-ui/data-grid'
import Alert from '@material-ui/lab/Alert'
import { Close as CloseIcon } from '@material-ui/icons'

import api from '../../utils/api.axios'
import UploadButton from './UploadButton'
import CSVUploader from '../CSVUploader'
import UserEmailInputField from './UserEmailInputField'

export default function StudentAssignment(props) {
  const [currentEmail, setCurrentEmail] = useState('')
  const [students, setStudents] = useState([])
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

    // Only apply a email prefix if the checkbox is checked and there is no existing prefix already
    let prefix =
      currentEmail.indexOf('@') === -1 && includeEmailPrefix
        ? '@studentmail.ul.ie'
        : ''
    let email = currentEmail + prefix
    let studentsList = [...students]
    studentsList.push({ id: studentsList.length, email: email })
    setCurrentEmail('')
    setStudents(studentsList)
  }

  const onAddBulk = bulkStudents => {
    let studentsList = [...students]
    for (let student of bulkStudents) {
      // Skip any empty rows or strings
      if (!student || student.length === 0) {
        return
      }
      studentsList.push({
        id: studentsList.length,
        email: student
      })
    }
    setStudents(studentsList)
  }

  const onUpload = async e => {
    if (students.length === 0) {
      return console.log('Please enter some student emails before uploading')
    }

    let body = {
      students: students
    }

    console.log('Uploading: ', body)

    api
      .post(`${config.endpoints.customApi}/student/assign`, body)
      .then(res => {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            let student = res.data[i]

            switch (student.status) {
              case 'not_found':
                console.log(
                  student.email +
                    'could not be found. Is the email address correct?'
                )
                break
              case 'already_assigned':
                console.log(
                  student.email + ' is already assigned the student role'
                )
                break
              case 'assigned':
                console.log(
                  student.email +
                    ' has been assinged the student role and added to the database'
                )
                break
              case 'exists':
                console.log(
                  student.email + ' is already assigned the student role'
                )
                break
              default:
                console.log(student)
                break
            }
          }
        }
        setStudents([])
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
      @studentmail.ul.ie
    </span>
  ) : (
    ''
  )

  const newStudentsColumns = [{ field: 'email', headerName: 'Email', flex: 1 }]

  return (
    <Container>
      <Typography variant="h6">Upload CSV file</Typography>
      <CSVUploader onAdd={onAddBulk} />
      <Container maxWidth="md">
        <Typography variant="h6">Add Individual Student</Typography>
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
        <div style={{ width: '100%', height: 400 }}>
          <DataGrid rows={students} columns={newStudentsColumns} pageSize={5} />
        </div>
        <br />
        <UploadButton disabled={!students.length} onUpload={onUpload} />
        <PrimaryButton
          type="text"
          color="secondary"
          onClick={() => {
            setStudents([])
          }}>
          Clear Student List
        </PrimaryButton>
      </Container>
    </Container>
  )
}
