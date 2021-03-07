import React from 'react'
import PropTypes from 'prop-types'

import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import CollapsableAlert from '../../CollapsableAlert'

const ListCoordinatorTable = props => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.refreshing ? (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={3}>
                  Refreshing Coordinator List ...
                </TableCell>
              </TableRow>
            ) : props.value.length === 0 ? (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={3}>
                  No Coordinators Found
                </TableCell>
              </TableRow>
            ) : (
              props.value.map(coordinator => (
                <TableRow key={coordinator.id}>
                  <TableCell component="th" scope="row">
                    {coordinator.displayName}
                  </TableCell>
                  <TableCell align="right">{coordinator.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => props.handleRemove(coordinator)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CollapsableAlert
        open={props.open}
        setOpen={props.setOpen}
        message={props.alert.message}
        severity={props.alert.severity}
      />
    </>
  )
}

ListCoordinatorTable.propTypes = {
  refreshing: PropTypes.bool.isRequired,
  value: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired
}

export default ListCoordinatorTable
