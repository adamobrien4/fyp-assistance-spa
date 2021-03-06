import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
  Checkbox,
  IconButton
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import api from '../../utils/api.axios'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { makeStyles } from '@material-ui/core/styles'
import Input from '../Input'
import PrimaryButton from '../PrimaryButton'
import CollapsableAlert from '../CollapsableAlert'

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

const SupervisorManagement = props => {
  const [supervisors, setSupervisors] = useState([])
  const [visableSupervisors, setVisableSupervisors] = useState([])
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState(null)
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

  const handleSelected = supervisorId => {
    let supervisorList = [...selected]

    if (supervisorList.includes(supervisorId)) {
      supervisorList.splice(supervisorList.indexOf(supervisorId), 1)
    } else {
      supervisorList.push(supervisorId)
    }

    setSelected(supervisorList)
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
      return setVisableSupervisors(supervisors)
    }
    let searched = supervisors.filter(
      supervisor => !supervisor.email.indexOf(e.target.value.trim())
    )
    setVisableSupervisors(searched)
  }

  const handleRemoveSingle = id => {
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
      <Link to="/supervisor/assign">
        <PrimaryButton>Go to Assign Supervisors Page</PrimaryButton>
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
            {visableSupervisors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Supervisors to show
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? visableSupervisors.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : visableSupervisors
              ).map(supervisor => (
                <TableRow key={supervisor.id}>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={selected.includes(supervisor.id)}
                      onClick={() => handleSelected(supervisor.id)}
                    />
                  </TableCell>
                  <TableCell align="right">{supervisor.email}</TableCell>
                  <TableCell align="right">
                    <PrimaryButton
                      loading={removing === supervisor.id}
                      onClick={() => handleRemoveSingle(supervisor._id)}
                      style={{ width: '50%', margin: '0 0 0 5px' }}
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
                count={visableSupervisors.length}
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

      <CollapsableAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alert.message}
        severity={alert.severity}
      />
    </Container>
  )
}

export default SupervisorManagement
