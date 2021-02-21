import React from 'react'
import PropTypes from 'prop-types'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Typography, Container } from '@material-ui/core'

import api from '../../utils/api.axios'

import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextData, contextData } = useData()

  const history = useHistory()

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      isCustomProposal: contextData.isCustomProposal,
      title: contextData.title,
      description: contextData.description,
      additionalNotes: contextData.additionalNotes,
      chooseMessage: contextData.chooseMeMessage,
      topic: contextData.topic._id
    }

    if (contextData.isCustomProposal) {
      let prevData = { ...formData }
      formData = {
        ...prevData,
        environment: contextData.environment,
        languages: contextData.languages
      }
    }

    console.log('Submitting ', formData)

    api
      .post('/proposal/add', formData)
      .then(res => {
        console.log(res)
        setContextData({})
        history.push('/proposals')
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.data) {
            case 'existing_topic_proposal':
              alert('Cannot create multiple proposals for a single topic')
              break
            default:
              break
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      })
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Finish (Review)</Typography>
      <code>{JSON.stringify(contextData)}</code>

      <Typography>
        {contextData.isCustomProposal
          ? 'Custom Proposal'
          : 'Supervisor Defined Proposal'}
      </Typography>

      {contextData.isCustomProposal ? null : (
        <>
          <Typography>{contextData.topic.title}</Typography>
          <Typography>{contextData.topic.supervisor?.displayName}</Typography>
        </>
      )}

      <Typography>{contextData.title}</Typography>
      <Typography>{contextData.description}</Typography>
      <Typography>{contextData.additionalNotes}</Typography>

      {contextData.isCustomProposal ? (
        <>
          <Typography>{contextData.environment}</Typography>
          <Typography>{contextData.languages}</Typography>
        </>
      ) : null}

      <PrimaryButton onClick={handleNextStep}>Submit Proposal</PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
