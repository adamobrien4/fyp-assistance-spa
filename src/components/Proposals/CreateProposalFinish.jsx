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
      chooseMessage: contextData.chooseMeMessage
    }

    if (contextData.isCustomProposal) {
      let prevData = { ...formData }
      formData = {
        ...prevData,
        environment: contextData.environment,
        languages: contextData.languages
      }
    } else {
      let prevData = { ...formData }
      formData = {
        ...prevData,
        topic: contextData.topic._id
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
      .catch(err => {
        console.log(err)
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
