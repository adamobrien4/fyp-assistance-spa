import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  Checkbox,
  IconButton
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { makeStyles } from '@material-ui/core/styles'
import { Input } from '../Input'
import { PrimaryButton } from '../PrimaryButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}))

function TablePaginationActions(props) {
  const classes = useStyles()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default function ManageStudent(props) {
  const [students, setStudents] = useState([])
  const [visableStudents, setVisableStudents] = useState([])
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    // Get students from DB
  }, [])

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

  const handleRemove = () => {
    console.log('Removing Students')
    console.log(selected)
  }

  return (
    <Container maxwidth="md">
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
                      style={{ width: '50%', margin: 0 }}
                      startIcon={<Edit />}>
                      View
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

      <PrimaryButton disabled={selected.length === 0} onClick={handleRemove}>
        Remove Selected
      </PrimaryButton>
    </Container>
  )
}
