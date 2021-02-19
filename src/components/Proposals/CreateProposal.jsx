import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory, useParams } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Container,
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
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'

import api from '../../utils/api.axios'

import Input from '../Input'
import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextData, contextData } = useData()
  let { topicCode } = useParams()

  const history = useHistory()
  // State hooks
  const [isCustomProposal, setIsCustomProposal] = useState(
    contextData?.isCustomProposal || false
  )
  const [topics, setTopics] = useState([])
  const [displayedTopics, setDisplayedTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(contextData?.topic)
  // TODO: Set loading to false if topics are in data.topics
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Custom Topic Available Supervisors
  const [customTopicSupervisors, setCustomTopicSupervisors] = useState(
    contextData?.customTopicSupervisors
  )
  const [selectedCustomSupervisor, setSelectedCustomSupervisor] = useState()

  useEffect(() => {
    if (topicCode) {
      console.log('Loading from topicCode')
      api
        .get('/topic/' + topicCode)
        .then(res => {
          console.log(res)
          setLoading(false)
          setTopics([])
          setContextData({
            referredFromTopic: true,
            isCustomProposal: false,
            topic: res.data.topic,
            topics: [],
            step: 2
          })
          history.push('./step2')
        })
        .catch(err => {
          console.log(err)
        })
      return
    }

    if (contextData?.topics?.length > 0) {
      console.log('Loading topics from context')
      console.log(contextData.topics)
      setTopics(contextData.topics)
      setLoading(false)
    } else {
      api
        .get('/topic')
        .then(res => {
          console.log(res.data.topics)
          setContextData({ ...contextData, topics: res.data.topics })
          setTopics(res.data.topics)
        })
        .catch(err => {
          console.log(err)
          // TODO: Only allow student defined topics to be created as no topics could be retrieved
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (contextData?.customTopicSupervisors?.length > 0) {
      console.log('Loading supervisors from context')
      console.log(contextData.customTopicSupervisors)
      setCustomTopicSupervisors(contextData.customTopicSupervisors)
      setLoading(false)
    } else {
      api
        .get('/supervisor/availableCustomTopic')
        .then(res => {
          console.log(res.data.supervisors)
          setContextData({ ...contextData, topics: res.data.supervisors })
          setCustomTopicSupervisors(res.data.supervisors)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
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
      ...contextData,
      isCustomProposal: isCustomProposal
    }

    if (contextData?.step === 0) {
      formData.step = 1
    }

    if (isCustomProposal) {
      // Custom Defined
    } else {
      // Supervisor Defined
      formData.topic = selectedTopic
    }

    setContextData(formData)
    history.push('/proposals/add/step2')
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

      {isCustomProposal ? (
        <div>
          <br />
          <Divider />
          <Select
            value="unselected"
            /*value={value}
            //onChange={e => onChange(e.target.value)}
            //style={{ marginTop: '16px' }}*/
          >
            <MenuItem value="unselected" selected disabled>
              Choose A Supervisor
            </MenuItem>
            {customTopicSupervisors.map(supervisor => (
              <MenuItem key={supervisor._id} value={supervisor._id}>
                {supervisor.displayName}
              </MenuItem>
            ))}
          </Select>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {customTopicSupervisors.map(supervisor => (
                  <TableRow
                    key={supervisor._id}
                    selected={supervisor._id === selectedCustomSupervisor?._id}>
                    <TableCell component="th" scope="row">
                      <Button
                        startIcon={<AddCircleIcon />}
                        onClick={() => setSelectedCustomSupervisor(supervisor)}>
                        Select
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {supervisor.displayName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div>
            {selectedCustomSupervisor ? (
              <Typography>
                Selected Supervisor: {selectedCustomSupervisor.displayName}
              </Typography>
            ) : customTopicSupervisors.length === 0 ? (
              <Typography>
                Could not retrieve any Supervisors, please try again later
              </Typography>
            ) : (
              <Typography>Please select a Supervisor to continue</Typography>
            )}
          </div>
        </div>
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
            placeholder="E.g AOB-01, MH-01, ..."
            label="Search Topic Code"
            value={searchTerm}
            onChange={handleInput}
            disabled={contextData.topics.length === 0}
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
            ) : topics.length === 0 ? (
              <Typography>
                Could not retrieve any Topics, please try again later or create
                a student defined proposal
              </Typography>
            ) : (
              <Typography>
                Please search and select a topic to continue
              </Typography>
            )}
          </div>
        </div>
      )}

      <PrimaryButton disabled={!selectedTopic} onClick={handleNextStep}>
        Save and Continue
      </PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
