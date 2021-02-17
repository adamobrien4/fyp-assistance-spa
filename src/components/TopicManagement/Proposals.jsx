import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import * as _ from 'lodash'

import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Divider,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper,
  Link as MuiLink,
  Typography,
  Button
} from '@material-ui/core'
import { Edit, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import api from '../../utils/api.axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { editFormSchema } from '../../utils/yupSchemas/yupTopicSchema.js'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Tags from '../Tags'
import TargetCoursesInput from '../TargetCoursesInput'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    flex: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  readOnlySelect: {
    width: 300,
    '&.Mui-disabled option': {
      color: 'black'
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    left: '50%'
  }
}))

const Test = props => {
  const classes = useStyles()

  const [editMode, setEditMode] = useState(false)
  const [savingChanges, setSavingChanges] = useState(false)
  const [loading, setLoading] = useState(false)
  const [proposals, setProposals] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState({})

  const [topic, setTopic] = useState({
    _id: '602944a349a37740b89a2357',
    status: 'draft',
    type: 'studentDefined',
    title: 'FYP Assistance System',
    description:
      'I am proposing to develop a FYP assistance system, which aims to automate or help with the current FYP process in UL.',
    additionalNotes: '',
    chooseMessage: 'Please work, again',
    student: 'a2d85a9c-a4ca-4a29-a62a-1b7c0d49851a',
    environment: 'PC (Windows), Linux',
    languages: 'React, JavaScript, Vue'
  })

  const defaultValues = {
    status: 'draft',
    type: 'studentDefined',
    title: 'FYP Assistance System',
    description:
      'I am proposing to develop a FYP assistance system, which aims to automate or help with the current FYP process in UL.',
    additionalNotes: '',
    chooseMessage: 'Please work, again',
    student: 'a2d85a9c-a4ca-4a29-a62a-1b7c0d49851a',
    environment: 'PC (Windows), Linux',
    languages: 'React, JavaScript, Vue'
  }

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(editFormSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  // Get all proposals for the current topic
  useEffect(() => {
    api
      .get(`/topic/proposals/${topic._id}`)
      .then(res => {
        console.log(res)

        setProposals(res.data.proposals)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const toggleEditMode = () => {
    let edtmd = !editMode
    setEditMode(edtmd)
  }

  const compareDiffs = data => {
    let differences = _.reduce(
      data,
      function (result, value, key) {
        // Compare data and props.topics properties
        if (!_.isEqual(value, props.topic[key])) result[key] = value
        return result
      },
      {}
    )

    console.log(differences)

    return Object.keys(differences).length > 0 ? differences : null
  }

  const onSubmit = data => {
    let differences = compareDiffs(data)

    console.log(differences)

    if (differences) {
      api
        .post(`/topic/edit/${topic._id}`, differences)
        .then(res => {
          console.log(res)
          props.refresh()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setSavingChanges(false)
          toggleEditMode()
        })
    } else {
      toggleEditMode()
    }
  }

  const selectProposal = proposal => {
    setSelectedProposal(proposal)
    setDialogOpen(true)
  }

  return (
    <Container maxWidth="lg">
      <Typography>Student Proposals</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Student</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow key="loading_supervisor_proposals">
                <TableCell colSpan={2} align="center">
                  Loading Values ...
                </TableCell>
              </TableRow>
            ) : proposals.length === 0 ? (
              <TableRow key="no_supervisor_proposals">
                <TableCell colSpan={2} align="center">
                  No Proposals to show
                </TableCell>
              </TableRow>
            ) : (
              proposals.map(proposal => (
                <TableRow key={proposal.id}>
                  <TableCell align="left">
                    <Link to={`/proposal/view/${proposal._id}`}>
                      {proposal.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {proposal.student.displayName}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

Test.defaultProps = {
  topic: {},
  dialogOpen: false,
  setDialogOpen: () => {},
  refresh: () => {}
}

Test.propTypes = {
  topic: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default Test
