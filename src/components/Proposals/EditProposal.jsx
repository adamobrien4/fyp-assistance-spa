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
import MultiLineInput from '../MultiLineInput'
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

const customProposalSchema = yup.object().shape({
  title: yup.string().required('Proposal must have a title'),
  description: yup.string().required('Proposal must have a description'),
  notes: yup.string(),
  environment: yup.string().required('Proposal must have environment provided'),
  languages: yup
    .string()
    .required('Proposal must have languages/technologies provided')
})

const providedProposalSchema = yup.object().shape({
  topic: yup.object().shape({
    _id: yup.string().required('Topic must have an _id')
  }),
  title: yup.string().required('Proposal must have a title'),
  description: yup.string().required('Proposal must have a description'),
  notes: yup.string()
})

const CreateProposal = props => {
  // CreateProposal Context
  const { setValues, data } = useData()

  console.log(data)

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
  const [projectTitle, setProjectTitle] = useState(data?.title || '')
  const [projectDescription, setProjectDescription] = useState(
    data?.description || ''
  )
  const [additionalNotes, setAdditionalNotes] = useState(data?.notes || '')
  const [environment, setEnvironment] = useState('')
  const [languages, setLanguages] = useState('')

  useEffect(() => {
    let step = data?.step || 1
    setValues({ step })

    api
      .get('/topic')
      .then(res => {
        setTopics(res.data.topics)
        setDisplayedTopics(res.data.topics)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)

        if (!data?.step) {
          setValues({ step: 1 })
        }
      })
  }, [])

  const handleProposalTypeChange = event => {
    console.log(event.target.value)
    let icp = event.target.value === 'student_defined'
    setIsCustomProposal(icp)
  }

  const handleSelect = topic => {
    setSelectedTopic(topic)
  }

  const handleInput = e => {
    setSearchTerm(e.target.value)

    let search = e.target.value.toLowerCase()

    if (search === '') {
      return setDisplayedTopics([...topics])
    }

    let filteredTopics = [...topics]
    filteredTopics = filteredTopics.filter(topic =>
      topic?.code?.toLowerCase().includes(search)
    )

    setDisplayedTopics(filteredTopics)
  }

  const handleOnTitleChange = e => {
    setProjectTitle(e.target.value)
  }

  const handleOnDescriptionChange = e => {
    setProjectDescription(e.target.value)
  }

  const handleOnNotesChange = e => {
    setAdditionalNotes(e.target.value)
  }

  const handleOnEnvironmentChange = e => {
    setEnvironment(e.target.value)
  }

  const handleOnLanguagesChange = e => {
    setLanguages(e.target.value)
  }

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      ...data,
      isCustomProposal: isCustomProposal
    }

    if (!data?.step) {
      formData.step = 1
    }

    if (isCustomProposal) {
      // Custom Defined
    } else {
      // Supervisor Defined
      formData.topic = selectedTopic
    }

    history.push('./add/step2')
    setValues(formData)
  }

  const onSubmit = data => {
    console.log(data)
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
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        {isCustomProposal ? (
          <Typography>Custom Proposal</Typography>
        ) : props?.selectedTopic ? (
          <Typography>
            User has selected a topic from a previous page and was redirectedd
            here
          </Typography>
        ) : (
          <div>
            <br />
            <Divider />
            <Input
              placeholder="Search Topic Code"
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

        {selectedTopic ? (
          <>
            <Input
              label="Project Title"
              onChange={handleOnTitleChange}
              value={projectTitle}
            />
            <MultiLineInput
              label="Project Description"
              onChange={handleOnDescriptionChange}
              value={projectDescription}
            />
            <MultiLineInput
              label="Additional Notes"
              onChange={handleOnNotesChange}
              value={additionalNotes}
            />
          </>
        ) : null}

        {isCustomProposal ? (
          <>
            <MultiLineInput
              label="Environment Required"
              onChange={handleOnEnvironmentChange}
              value={environment}
            />
            <MultiLineInput
              label="Languages / Technologies Required"
              onChange={handleOnLanguagesChange}
              value={languages}
            />
          </>
        ) : null}

        <PrimaryButton type="submit" onClick={handleNextStep}>
          Review
        </PrimaryButton>
      </Form>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
