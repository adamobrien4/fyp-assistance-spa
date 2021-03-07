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

const StudentAssignment = props => {
  const [currentEmail, setCurrentEmail] = useState('')
  const [students, setStudents] = useState([])
  const [includeEmailPrefix, setIncludeEmailPrefix] = useState(true)
  const [alert, setAlert] = useState({})
  const [alertOpen, setAlertOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const onChange = e => {
    setCurrentEmail(e.target.value)
  }

  const onAdd = e => {
    if (currentEmail.length === 0) {
      setAlert({ message: 'Cannot add empty email!', severity: 'warning' })
      setAlertOpen(true)
      return
    }

    if (students.filter(student => student.email === currentEmail).length > 0) {
      setAlert({ message: 'Cannot add duplicate email!', severity: 'warning' })
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
      setAlert({ message: 'Cannot add invalid email!', severity: 'warning' })
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
    console.log('studentsList', studentsList)
    console.log('bulkStudents', bulkStudents)
    for (let student of bulkStudents) {
      // Skip any empty rows or strings
      if (!student || student.length === 0) {
        console.log('Skipping', student)
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

    setUploading(true)
    api
      .post('/student/assign', body)
      .then(res => {
        console.log(res.data)
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
            setAlert({
              message:
                'Could not add the following student emails (Hover email for more details)',
              severity: 'error'
            })
          } else {
            setAlert({
              message: 'All students were sucessfully added',
              severity: 'success'
            })
          }
          setAlertOpen(true)
          return setStudents(remainingStudents)
        }
        setStudents([])
        setAlert({
          message: 'All students were sucessfully added',
          severity: 'success'
        })

        setAlertOpen(true)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setUploading(false)
      })
  }

  const onChangeEmailPrefix = e => {
    setIncludeEmailPrefix(e.target.checked)
  }

  const handleRemove = studentEmail => {
    let filteredStudents = students.filter(s => s.email !== studentEmail)
    setStudents(filteredStudents)
  }

  const endAdornment = includeEmailPrefix ? (
    <span style={{ fontSize: '10px', color: 'gray', marginRight: 10 }}>
      @studentmail.ul.ie
    </span>
  ) : (
    ''
  )

  return (
    <Container maxWidth="lg">
      <BackButton />
      <Typography variant="h6">Upload CSV file</Typography>
      <CSVUploader onAdd={onAddBulk} />

      <br />
      <Divider />
      <br />

      <Typography variant="h6">Add Individual Student</Typography>
      <UserEmailInputField
        email={currentEmail}
        endAdornment={endAdornment}
        onChange={onChange}
        includeEmailPrefix={includeEmailPrefix}
        onChangeEmailPrefix={onChangeEmailPrefix}
        onAdd={onAdd}
      />

      <br />

      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />

      <br />

      <PaginatedTable
        value={students}
        removableEntries
        removeEntry={handleRemove}
      />

      <UploadButton
        disabled={!students.length}
        loading={uploading}
        onUpload={onUpload}
      />
      <PrimaryButton
        type="button"
        color="secondary"
        onClick={() => {
          setStudents([])
          setAlertOpen(false)
        }}>
        Clear Student List
      </PrimaryButton>
    </Container>
  )
}

export default StudentAssignment
