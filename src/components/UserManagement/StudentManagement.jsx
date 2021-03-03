import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Checkbox
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import api from '../../utils/api.axios'
import Input from '../Input'
import PrimaryButton from '../PrimaryButton'
import CollapsableAlert from '../CollapsableAlert'

import TablePaginationActions from '../Table/TablePaginationActions'

const StudentManagement = props => {
  const [students, setStudents] = useState([])
  const [visableStudents, setVisableStudents] = useState([])
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
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

  const handleSelected = studentId => {
    let studentList = [...selected]

    if (studentList.includes(studentId)) {
      studentList.splice(studentList.indexOf(studentId), 1)
    } else {
      studentList.push(studentId)
    }

    setSelected(studentList)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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

  const handleRemoveSingle = id => {
    console.log('removing student w/ id', id)

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
  }

  const handleRemove = () => {
    console.log('Removing Students')
    console.log(selected)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Container maxwidth="md">
      <Link to="/student/assign">
        <PrimaryButton>Assign Students</PrimaryButton>
      </Link>
      <Input label="Search" onChange={handleSearch} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Selected ({selected.length})</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visableStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Students to show
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? visableStudents.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : visableStudents
              ).map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={selected.includes(student.id)}
                      onClick={() => handleSelected(student.id)}
                    />
                  </TableCell>
                  <TableCell align="right">{student.email}</TableCell>
                  <TableCell align="right">
                    <PrimaryButton
                      style={{ width: '25%', margin: 0 }}
                      startIcon={<Edit />}>
                      View
                    </PrimaryButton>
                    <PrimaryButton
                      onClick={() => handleRemoveSingle(student._id)}
                      style={{ width: '25%', margin: '0 0 0 5px' }}
                      color="secondary"
                      startIcon={<Delete />}>
                      Delete
                    </PrimaryButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={visableStudents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {console.log(alertOpen)}
      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />
      {/* <PrimaryButton disabled={selected.length === 0} onClick={handleRemove}>
        Remove Selected
      </PrimaryButton> */}
    </Container>
  )
}

export default StudentManagement
