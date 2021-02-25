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
import BackButton from '../../Buttons/BackButton'

const StudentAssignment = props => {
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

    if (students.filter(student => student.email === currentEmail).length > 0) {
      setAlertMessage('Cannot add duplicate email!')
      setAlertOpen(true)
      return
    }

    // Only apply a email prefix if the checkbox is checked and there is no existing prefix already
    let prefix =
      currentEmail.indexOf('@') === -1 && includeEmailPrefix
        ? '@studentmail.ul.ie'
        : ''
    let email = currentEmail.trim() + prefix

    let re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
      setAlertMessage('Cannot add invalid email!')
      setAlertOpen(true)
      return
    }

    let studentsList = [...students]
    studentsList.push({ email: email })
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
      .post('/student/assign', body)
      .then(res => {
        console.log(res.data.students)
        if (res.data.students.length > 0) {
          let studentsMap = [...students]
          let emailsMap = students.map(student => student.email)

          for (let student of res.data.students) {
            let index = emailsMap.indexOf(student.email)

            if (index < 0) {
              // Couldn't find student email address returned from api
              continue
            }

            studentsMap[index].status = student.status
          }

          let remainingStudents = studentsMap.filter(
            student =>
              !['assigned', 'exists', undefined].includes(student?.status)
          )
          console.log(remainingStudents)
          if (remainingStudents.length > 0) {
            setAlertMessage(
              'The following student email addresses could not be linked to a student'
            )
            setAlertOpen(true)
          }
          return setStudents(remainingStudents)
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

  return (
    <Container>
      <BackButton />
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

        {/* TODO: Replace with collapsible alert component */}
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

        <PaginatedTable value={students} />

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

export default StudentAssignment
