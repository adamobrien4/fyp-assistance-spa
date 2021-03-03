import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableCell,
  TableRow,
  Tooltip,
  Paper,
  IconButton,
  Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  },
  assigned: {
    color: 'green'
  },
  not_found: {
    color: 'red'
  },
  exists: {
    color: 'orange'
  },
  no_assignment: {
    color: 'red'
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

const userTooltipTitles = {
  exists: 'Exists: This user is already assigned this role',
  not_found: 'Not Found: Email could not be linked to an active user account',
  assigned: 'The role was sucessfully assigned to this user'
}

const PaginatedTable = props => {
  const [visable, setVisable] = useState(props.value)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    setVisable(props.value)
  }, [props.value])

  const classes = useStyles()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            {props.removableEntries ? (
              <TableCell align="right">Actions</TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {visable.length === 0 ? (
            <TableRow>
              <TableCell colspan={props.removableEntries ? 2 : 1}>
                No Users to display
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? visable.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : visable
            ).map(user => (
              <TableRow key={user.id}>
                <Tooltip
                  title={
                    user?.status ? userTooltipTitles[user.status] : user.email
                  }>
                  <TableCell
                    className={user?.status ? classes[user.status] : ''}>
                    {user.email}
                  </TableCell>
                </Tooltip>
                {props.removableEntries ? (
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => props.removeEntry(user.email)}>
                      Remove
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={visable.length}
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
  )
}

PaginatedTable.propTypes = {
  value: PropTypes.array.isRequired,
  removableEntries: PropTypes.bool,
  removeEntry: PropTypes.func
}

export default PaginatedTable
