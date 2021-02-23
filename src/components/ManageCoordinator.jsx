import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  formSchema,
  defaultValues
} from '../utils/yupSchemas/ManageCoordinator.js'

import {
  Container,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide
} from '@material-ui/core'
import { ArrowForward, Delete } from '@material-ui/icons'

import api from '../utils/api.axios'

import PrimaryButton from './PrimaryButton'
import Input from './Input'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ManageCoordinator(props) {
  const [selectedCoordinator, setSelectedCoordinator] = useState()
  const [assignedCoordinators, setAssignedCoordinators] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(true)

  const { register, handleSubmit, setError, errors } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  useEffect(() => {
    refreshAssignedCoordinators()
  }, [])

  const handleAssignCoordinator = data => {
    api
      .post('/coordinator/assign', data)
      .then(res => {
        if (res.data) {
          switch (res.data) {
            case 'success':
              console.log('Sucessful Coordinator assign')
              // TODO: Find out how to assign this role automatically
              alert(
                'Please assign "Privilaged Role Administrator" to uploaded Coordinator to continue, (Azure Admin Center)'
              )
              refreshAssignedCoordinators()
              break
            case 'exists':
              setError('coordinator', {
                type: 'manual',
                message: 'User is already a Coordinator'
              })
              break
            case 'not_found':
              setError('coordinator', {
                type: 'manual',
                message: 'Coordinator could not be found'
              })
              break
            default:
              setError('coordinator', {
                type: 'manual',
                message: 'An unknown error occurred, please try again'
              })
              console.log('Coordinator could not be assigned')
              console.log(res.data)
          }
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err))
  }

  const refreshAssignedCoordinators = () => {
    setRefreshing(true)

    api
      .get('/coordinator')
      .then(res => {
        if (!res.data?.coordinators) {
          return setAssignedCoordinators([])
        }

        setAssignedCoordinators(res.data.coordinators)
      })
      .catch(err => {
        console.log(err)
        setRefreshing(false)
      })
      .finally(() => {
        setRefreshing(false)
      })
  }

  const handleRemoveClick = coordinator => {
    setSelectedCoordinator(coordinator)
    setDialogOpen(true)
  }

  const handleRemove = deleteCoordinator => {
    if (deleteCoordinator) {
      api
        .post('/coordinator/remove', { coordinatorId: selectedCoordinator._id })
        .then(resp => {
          console.log(resp)
          refreshAssignedCoordinators()
        })
        .then(err => console.log(err))
    }
  }

  return (
    <Container maxWidth="md">
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">
          Remove Coordinator?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove
            <br />
            <span style={{ fontWeight: 'bold' }}>
              {selectedCoordinator?.displayName}
            </span>
            <br />
            Coordinator role?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => handleRemove(false)}
            color="primary">
            No
          </Button>
          <Button
            startIcon={<Delete />}
            variant="contained"
            onClick={() => handleRemove(true)}
            color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6">Manage Coordinators</Typography>
      <br />
      <form onSubmit={handleSubmit(handleAssignCoordinator)}>
        <Input
          inputRef={register}
          label="Coordinator Email"
          placeholder="e.g. John.Keane@ul.ie"
          variant="outlined"
          name="coordinator"
          style={{ margin: 0 }}
          error={!!errors.coordinator}
          helperText={errors?.coordinator?.message}
        />
        <PrimaryButton
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}>
          Assign New Coordinator
        </PrimaryButton>
      </form>

      <Typography variant="h6">Existing Coordinators</Typography>
      <br />

      {refreshing ? (
        <span>Loading Coordinators list ...</span>
      ) : assignedCoordinators.length === 0 ? (
        <Typography variant="body1">
          There are currently no assigned coordinators
        </Typography>
      ) : (
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
              {assignedCoordinators.map(coordinator => (
                <TableRow key={coordinator.id}>
                  <TableCell component="th" scope="row">
                    {coordinator.displayName}
                  </TableCell>
                  <TableCell align="right">{coordinator.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<Delete />}
                      onClick={() => handleRemoveClick(coordinator)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
