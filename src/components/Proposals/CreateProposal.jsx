import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Container,
  Grid,
  Switch,
  TableContainer,
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import api from '../../utils/api.axios'

import Input from '../Input'
import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'
import Form from '../Form'

const AntSwitch = withStyles(theme => ({
  root: {
    width: 44,
    height: 20,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(24px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 16,
    height: 16,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch)

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextValues, data } = useData()

  const history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur'
  })
  // State hooks
  const [isCustomProposal, setIsCustomProposal] = useState(
    data?.isCustomProposal || false
  )
  const [topics, setTopics] = useState([])
  const [displayedTopics, setDisplayedTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(data?.topic)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (data?.topics) {
      console.log('Loading topics from context')
      console.log(data.topics)
      setTopics(data.topics)
      setLoading(false)
    } else {
      api
        .get('/topic')
        .then(res => {
          setContextValues({ ...data, topics: res.data.topics })
          setTopics(res.data.topics)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)

          if (!data?.step) {
            setContextValues({ step: 1 })
          }
        })
    }
  }, [])

  const handleProposalTypeChange = event => {
    console.log(event.target.value)
    let isStudentDefined = event.target.value === 'student_defined'
    setIsCustomProposal(isStudentDefined)
    setSelectedTopic(isStudentDefined ? { title: 'Custom Topic' } : null)
  }

  const handleSelect = topic => {
    setSelectedTopic(topic)
  }

  const handleInput = e => {
    setSearchTerm(e.target.value)

    let search = e.target.value.toLowerCase()

    if (search === '') {
      return setDisplayedTopics([])
    }

    let filteredTopics = [...topics]
    filteredTopics = filteredTopics.filter(topic =>
      topic?.code?.toLowerCase().includes(search)
    )

    setDisplayedTopics(filteredTopics)
  }

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      ...data,
      isCustomProposal: isCustomProposal
    }

    if (isCustomProposal) {
      // Custom Defined
    } else {
      // Supervisor Defined
      formData.topic = selectedTopic
    }

    history.push('/proposals/add/step2')
    setContextValues(formData)
  }

  if (loading) {
    return <Typography>Loading Topics...</Typography>
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb isCustomProposal={isCustomProposal} />
      <Typography variant="h4" component="h1" align="center">
        Create Proposal
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Proposal Type</FormLabel>
        <RadioGroup
          aria-label="proposal_type"
          name="gender1"
          value={isCustomProposal ? 'student_defined' : 'supervisor_defined'}
          onChange={handleProposalTypeChange}>
          <FormControlLabel
            value="student_defined"
            control={<Radio />}
            label="Student Defined"
          />
          <FormControlLabel
            value="supervisor_defined"
            control={<Radio />}
            label="Supervisor Defined"
          />
        </RadioGroup>
      </FormControl>

      {isCustomProposal ? null : props?.selectedTopic ? (
        <Typography>
          User has selected a topic from a previous page and was redirectedd
          here
        </Typography>
      ) : (
        <div>
          <br />
          <Divider />
          <Input
            placeholder="E.g AOB-01, MH-01, ..."
            label="Search Topic Code"
            value={searchTerm}
            onChange={handleInput}
          />

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {displayedTopics.map(topic => (
                  <TableRow
                    key={topic._id}
                    selected={topic._id === selectedTopic?._id}>
                    <TableCell component="th" scope="row">
                      <Button
                        startIcon={<AddCircleIcon />}
                        onClick={() => handleSelect(topic)}>
                        Select
                      </Button>
                    </TableCell>
                    <TableCell align="right">{topic?.code}</TableCell>
                    <TableCell align="right">{topic.title}</TableCell>
                    <TableCell align="right">
                      {topic?.supervisor?.displayName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div>
            {selectedTopic ? (
              <Typography>Selected Topic: {selectedTopic.title}</Typography>
            ) : (
              <Typography>Please select a topic to continue</Typography>
            )}
          </div>
        </div>
      )}

      <PrimaryButton disabled={!selectedTopic} onClick={handleNextStep}>
        Next Step
      </PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
