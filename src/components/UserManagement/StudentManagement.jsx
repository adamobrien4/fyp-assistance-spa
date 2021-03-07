import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Typography } from '@material-ui/core'

import api from '../../utils/api.axios'
import Input from '../Input'
import PrimaryButton from '../PrimaryButton'
import CollapsableAlert from '../CollapsableAlert'

import UserTable from './UserTable'

const StudentManagement = props => {
  const [students, setStudents] = useState([])
  const [visableStudents, setVisableStudents] = useState([])

  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState('')
  const [alert, setAlert] = useState({})
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    refreshStudentList()
  }, [])

  const refreshStudentList = () => {
    // Get students from DB
    api
      .get('/student')
      .then(res => {
        console.log(res)
        setStudents(res.data.students)
        setVisableStudents(res.data.students)
      })
      .catch(err => {
        switch (err) {
          case 'error_retrieving_students':
            setAlert({
              message: 'Could not retrieve students from database',
              severity: 'warning'
            })
            break
          default:
            setAlert({
              message: 'An error occurred, please try again',
              severity: 'error'
            })
        }
        setAlertOpen(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSearch = e => {
    if (e.target.value === '') {
      return setVisableStudents(students)
    }
    let searched = students.filter(
      student => !student.email.indexOf(e.target.value.trim())
    )
    setVisableStudents(searched)
  }

  const handleRemove = id => {
    console.log('removing student w/ id', id)

    setRemoving(id)
    api
      .post('/student/delete', { studentId: id })
      .then(res => {
        console.log(res)
        setAlert({
          message: 'Student sucessfully removed',
          severity: 'success'
        })
        setAlertOpen(true)
        refreshStudentList()
      })
      .catch(err => {
        console.log(err)
        switch (err) {
          case 'error_retrieving_student':
            setAlert({
              message:
                'An error occurred while retrieving the student. Please try again',
              severity: 'warning'
            })
            break
          case 'student_not_found':
            setAlert({
              message: 'Could not find the requested student',
              severity: 'warning'
            })
            refreshStudentList()
            break
          default:
            setAlert({
              message: 'An error occurred, please try again',
              severity: 'error'
            })
        }

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
        Student Management
      </Typography>
      <Input label="Search" onChange={handleSearch} />

      <UserTable
        values={visableStudents}
        remove={handleRemove}
        removing={removing}
      />

      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />

      <Link to="/student/assign">
        <PrimaryButton>Assign Students</PrimaryButton>
      </Link>
    </Container>
  )
}

export default StudentManagement
