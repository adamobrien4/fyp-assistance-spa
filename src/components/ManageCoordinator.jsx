import React, { useState, useEffect } from 'react'

import {
  Container,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table, TableHead,
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

import API from '../utils/api.axios'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ManageCoordinator (props) {
  const [currentEmail, setCurrentEmail] = useState('')
  const [assignedCoordinators, setAssignedCoordinators] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCoordinator, setSelectedCoordinator] = useState({ email: 'Unselected', id: '0', displayName: 'Unnamed' })
  const [refreshing, setRefreshing] = useState(true)

  useEffect(() => {
    refreshAssignedCoordinators()
  }, [])

  const onEmailChange = (e) => {
    setCurrentEmail(e.target.value.trim())
  }

  const handleAssignCoordinator = () => {
    if (currentEmail.length === 0) {
      return
    }
    console.log('Handling assign of coordinator: ' + currentEmail)

    const body = {
      coordinator: currentEmail
    }

    API.post('/coordinator/assign', body)
      .then(res => {
        if (res.data) {
          switch (res.data) {
            case 'success':
              console.log('Sucessful Coordinator assign')
              // TODO: Find out how to assign this role automatically
              alert('Please assign "Privilaged Role Administrator" to uploaded Coordinator to continue, (Azure Admin Center)')
              refreshAssignedCoordinators()
              break
            default:
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

    API.get('/coordinator')
      .then(res => {
        let coordinatorList = res.data.map(coordinator => {
          return {
            id: coordinator._id,
            displayName: coordinator.displayName,
            email: coordinator.email
          }
        })
        setAssignedCoordinators(coordinatorList)
        setRefreshing(false)
      })
      .catch(err => {
        console.log(err)
        setRefreshing(false)
      })
  }

  const handleRemoveClick = (coordinator) => {
    setSelectedCoordinator(coordinator)
    setDialogOpen(true)
  }

  const handleRemove = (resp) => {
    setDialogOpen(false)
    if (resp) {
      console.log('Deleting user: ' + selectedCoordinator.displayName)
      let body = {
        coordinatorId: selectedCoordinator.id
      }
      API.post('/coordinator/remove', body)
        .then(resp => {
          console.log(resp)
          refreshAssignedCoordinators()
        })
        .then(err => console.log(err))
      return
    }
    console.log('Not deleting user')
  }

  return (
    <Container maxWidth='md'>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove<br /><span style={{ fontWeight: 'bold' }}>{selectedCoordinator.displayName}</span><br />as a Coordinator?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => handleRemove(false)} color="primary">
            No
          </Button>
          <Button startIcon={<Delete />} variant='contained' onClick={() => handleRemove(true)} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant='h6'>Manage Coordinators</Typography>
      <br />

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <TextField label='Coordinator Email' variant='outlined' style={{ width: '50%' }} value={currentEmail} onChange={onEmailChange}/>
        <Button variant='contained' color='primary' endIcon={<ArrowForward />} onClick={handleAssignCoordinator}>Assign New Coordinator</Button>
      </div>

      <Typography variant='h6'>Existing Coordinators</Typography>
      <br />

      {refreshing ? (
        <span>Loading Coordinators list ...</span>
      ) : (
        assignedCoordinators.length === 0 ? (
          <Typography variant='body1'>There are currently no assigned coordinators</Typography>
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
                {assignedCoordinators.map((coordinator) => (
                  <TableRow key={coordinator.id}>
                    <TableCell component="th" scope="row">
                      {coordinator.displayName}
                    </TableCell>
                    <TableCell align="right">{coordinator.email}</TableCell>
                    <TableCell align="right">
                    <Button variant='outlined' color='secondary' startIcon={<Delete />} onClick={() => handleRemoveClick(coordinator)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </Container>
  )
}
