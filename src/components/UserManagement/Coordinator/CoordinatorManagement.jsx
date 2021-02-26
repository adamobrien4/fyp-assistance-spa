import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  formSchema,
  defaultValues
} from '../../../utils/yupSchemas/ManageCoordinator.js'

import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide
} from '@material-ui/core'
import { ArrowForward, Delete } from '@material-ui/icons'

import api from '../../../utils/api.axios'

import ListCoordinatorTable from './ListCoordinatorTable'
import PrimaryButton from '../../PrimaryButton'
import Input from '../../Input'
import CollapsableAlert from '../../CollapsableAlert'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ManageCoordinator(props) {
  const [selectedCoordinator, setSelectedCoordinator] = useState()
  const [assignedCoordinators, setAssignedCoordinators] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(true)
  const [alert, setAlert] = useState({})
  const [alertOpen, setAlertOpen] = useState(false)
  const [tableAlert, setTableAlert] = useState({})
  const [tableAlertOpen, setTableAlertOpen] = useState(false)

  const { register, handleSubmit, errors } = useForm({
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
        console.log(res)
        switch (res.data) {
          case 'success':
            console.log('Sucessful Coordinator assign')
            // TODO: Find out how to assign this role automatically
            setAlert({
              message: 'Coordinator suvessfully assigned',
              severity: 'success'
            })
            refreshAssignedCoordinators()
            break
          case 'exists':
            setAlert({
              message: 'User is already a Coordinator',
              severity: 'warning'
            })
            break
          case 'not_found':
            setAlert({
              message: 'Email address could not be found',
              severity: 'error'
            })
            break
          default:
            setAlert({
              message: 'An error occurred, please try again',
              severity: 'error'
            })
        }
        console.log(alert)
        setAlertOpen(true)
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
        setTableAlert({
          message: err.message,
          severity: 'error'
        })
        setTableAlertOpen(true)
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
          setTableAlert({
            message: 'Coordinator sucessfully removed',
            severity: 'success'
          })
          setTableAlertOpen(true)
          refreshAssignedCoordinators()
        })
        .catch(err => {
          console.log(err)
          setTableAlert({
            message: 'Could not remove coordinator',
            severity: 'error'
          })
          setTableAlertOpen(true)
        })
      setDialogOpen(false)
    } else {
      setDialogOpen(false)
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
        <CollapsableAlert
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alert.message}
          severity={alert.severity}
        />
      </form>

      <Typography variant="h6">Existing Coordinators</Typography>
      <br />

      <ListCoordinatorTable
        refreshing={refreshing}
        value={assignedCoordinators}
        open={tableAlertOpen}
        setOpen={setTableAlertOpen}
        handleRemove={handleRemoveClick}
        alert={tableAlert}
      />
    </Container>
  )
}
