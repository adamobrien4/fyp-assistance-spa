import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import PrimaryButton from '../PrimaryButton'
import TablePaginationActions from '../Table/TablePaginationActions'

const UserTable = ({ values, remove, removing, ...props }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No Students to show
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? values.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : values
            ).map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <PrimaryButton
                    onClick={() => remove(user._id)}
                    style={{ width: '25%', margin: '0 0 0 5px' }}
                    color="secondary"
                    startIcon={<Delete />}
                    loading={removing === user._id}>
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
              count={values.length}
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

UserTable.propTypes = {
  values: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  removing: PropTypes.string
}

export default UserTable
