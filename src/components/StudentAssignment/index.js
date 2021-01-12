import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../../config/msal-config'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Paper, InputBase, Divider, Button, IconButton, Checkbox, Tooltip, Collapse } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AddCircle as AddCircleIcon, Close as CloseIcon } from '@material-ui/icons'

import { useMsal, useAccount } from '@azure/msal-react'
import { getAccessToken } from '../../msalHelpers'

import UploadButton from './UploadButton'
import CSVUploader from '../CSVUploader'
import { DataGrid } from '@material-ui/data-grid'

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

export default function StudentAssignment (props) {
  const classes = useStyles()

  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] || {})

  const [currentEmail, setCurrentEmail] = useState('')
  const [students, setStudents] = useState([])
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

    // TODO: Check if email aleady has @stuentmail.ul.ie added, and dont add the prefix if so
    // TODO: Check if email already has a prefix e.g. @ul.ie etc .split('@')[1] ...
    let prefix = includeEmailPrefix ? '@studentmail.ul.ie' : ''
    let email = currentEmail + prefix
    let studentsList = [...students]
    studentsList.push({ id: studentsList.length, email: email })
    setCurrentEmail('')
    setStudents(studentsList)
  }

  const onAddBulk = (bulkStudents) => {
    let studentsList = [...students]
    for (let student of bulkStudents) {
      // Skip any empty rows or strings
      if (!student || student.length === 0) {
        return
      }
      studentsList.push({
        id: studentsList.length,
        email: student
      })
    }
    setStudents(studentsList)
  }

  const onUpload = async (e) => {
    if (students.length === 0) {
      return console.log('Please enter some student emails before uploading')
    }

    let body = {
      students: students
    }

    console.log('Uploading: ', body)

    let request = {
      authority:
      `${config.endpoints.login}/${config.auth.tenantId}`,
      scopes: config.auth.scopes.customApi,
      account: accounts[0]
    }

    let accessResponse = await getAccessToken(instance, request)

    const bearer = `Bearer ${accessResponse.accessToken}`

    const options = {
      headers: {
        Authorization: bearer
      }
    }

    axios.post(`${config.endpoints.customApi}/students/assign`, body, options)
      .then(res => {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            let student = res.data[i]

            switch (student.status) {
              case 'not_found':
                console.log(student.email + 'could not be found. Is the email address correct?')
                break
              case 'already_assigned':
                console.log(student.email + ' is already assigned the student role')
                break
              case 'assigned':
                console.log(student.email + ' has been assinged the student role and added to the database')
                break
              case 'exists':
                console.log(student.email + ' is already assigned the student role')
                break
              default:
                console.log(student)
                break
            }
          }
        }
        setStudents([])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChangeEmailPrefix = (e) => {
    setIncludeEmailPrefix(e.target.checked)
  }

  const endAdornment = includeEmailPrefix ? <span style={{ fontSize: '10px', color: 'gray', marginRight: 10 }}>@studentmail.ul.ie</span> : ''

  const newStudentsColumns = [
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
          Add Individual Student
        </Typography>
        <Paper component='form' className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder='Student Email'
            value={currentEmail}
            inputProps={{ 'aria-label': 'Student Email' }}
            endAdornment={endAdornment}
            onChange={onChange}
          />
          <Tooltip title='Include @studentmail prefix' aria-label='Include @studentmail prefix'>
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
            rows={students}
            columns={newStudentsColumns}
            pageSize={5}
          />
        </div>
        <br />
        {/* eslint-disable-next-line no-unneeded-ternary */}
        <UploadButton disabled={ students.length ? false : true } onUpload={onUpload} />
        <Button variant='outlined' color='secondary' onClick={() => { setStudents([]) }} >Clear Student List</Button>
      </Container>
    </Container>
  )
}
