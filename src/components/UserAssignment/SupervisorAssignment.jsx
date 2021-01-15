import React, { useState, useEffect } from 'react'
import { useMsal, useAccount } from '@azure/msal-react'
import { config } from '../../config/msal-config'

import api from '../../utils/api.axios'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Paper, InputBase, Divider, Button, IconButton, Checkbox, Tooltip, Collapse } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import Alert from '@material-ui/lab/Alert'
import { AddCircle as AddCircleIcon, Close as CloseIcon } from '@material-ui/icons'

import UploadButton from './UploadButton'
import CSVUploader from '../CSVUploader'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

export default function SupervisorAssignment (props) {
  const classes = useStyles()

  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] || {})

  const [currentEmail, setCurrentEmail] = useState('')
  const [supervisors, setSupervisors] = useState([])
  const [includeEmailPrefix, setIncludeEmailPrefix] = useState(true)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Alert Message')

  useEffect(() => {
    console.log('Running use effect')
  }, [account, instance])

  const onChange = (e) => {
    setCurrentEmail(e.target.value)
  }

  const onAdd = (e) => {
    if (currentEmail.length === 0) {
      setAlertMessage('Cannot add empty email!')
      setAlertOpen(true)
      return
    }

    // TODO: Check if email aleady has @ul.ie added, and dont add the prefix if so
    // TODO: Check if email already has a prefix e.g. @ul.ie etc .split('@')[1] ...
    let prefix = includeEmailPrefix ? '@ul.ie' : ''
    let email = currentEmail + prefix
    let supervisorsList = [...supervisors]
    supervisorsList.push({ id: supervisorsList.length, email: email })
    setCurrentEmail('')
    setSupervisors(supervisorsList)
  }

  const onAddBulk = (bulksupervisors) => {
    let supervisorsList = [...supervisors]
    for (let supervisor of bulksupervisors) {
      // Skip any empty rows or strings
      if (!supervisor || supervisor.length === 0) {
        return
      }
      supervisorsList.push({
        id: supervisorsList.length,
        email: supervisor
      })
    }
    setSupervisors(supervisorsList)
  }

  const onUpload = async (e) => {
    if (supervisors.length === 0) {
      return console.log('Please enter some supervisor emails before uploading')
    }

    let body = {
      supervisors: supervisors
    }

    console.log('Uploading: ', body)

    api.post('/supervisor/assign', body)
      .then(res => {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            let supervisor = res.data[i]

            switch (supervisor.status) {
              case 'not_found':
                console.log(supervisor.email + 'could not be found. Is the email address correct?')
                break
              case 'already_assigned':
                console.log(supervisor.email + ' is already assigned the supervisor role')
                break
              case 'assigned':
                console.log(supervisor.email + ' has been assinged the supervisor role and added to the database')
                break
              case 'exists':
                console.log(supervisor.email + ' is already assigned the supervisor role')
                break
              default:
                console.log(supervisor)
                break
            }
          }
        }
        setSupervisors([])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChangeEmailPrefix = (e) => {
    setIncludeEmailPrefix(e.target.checked)
  }

  const endAdornment = includeEmailPrefix ? <span style={{ fontSize: '10px', color: 'gray', marginRight: 10 }}>@ul.ie</span> : ''

  const newsupervisorsColumns = [
    { field: 'email', headerName: 'Email', flex: 1 }
  ]

  return (
    <Container>
      <Typography variant='h6'>
          Upload CSV file
      </Typography>
      <CSVUploader onAdd={onAddBulk} />
      <Container maxWidth='md'>
        <Typography variant='h6'>
          Add Individual Supervisor
        </Typography>
        <Paper component='form' className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder='Supervisor Email'
            value={currentEmail}
            inputProps={{ 'aria-label': 'Supervisor Email' }}
            endAdornment={endAdornment}
            onChange={onChange}
          />
          <Tooltip title='Include @ul prefix' aria-label='Include @ul prefix'>
            <Checkbox
              edge='start'
              disableRipple
              checked={includeEmailPrefix}
              onChange={onChangeEmailPrefix}
            />
          </Tooltip>
          <Divider className={classes.divider} orientation='vertical' />
          <IconButton className={classes.iconButton} aria-label='search' onClick={onAdd}>
            <AddCircleIcon />
          </IconButton>
        </Paper>
        <Collapse in={alertOpen}>
          <Alert
            severity='error'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setAlertOpen(false)
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {alertMessage}
          </Alert>
        </Collapse>

        <br />
        <div style={{ width: '100%', height: 400 }}>
          <DataGrid
            rows={supervisors}
            columns={newsupervisorsColumns}
            pageSize={5}
          />
        </div>
        <br />
        {/* eslint-disable-next-line no-unneeded-ternary */}
        <UploadButton disabled={ supervisors.length ? false : true } onUpload={onUpload} />
        <Button variant='outlined' color='secondary' onClick={() => { setSupervisors([]) }} >Clear Supervisor List</Button>
      </Container>
    </Container>
  )
}
