import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { PhaseContext } from '../../contexts/PhaseContext'
import { useData } from '../../contexts/CreateProposalContext'
import { useHistory } from 'react-router-dom'

import { Typography, Container, Tooltip } from '@material-ui/core'

import HelpIcon from '@material-ui/icons/Help'

import api from '../../utils/api.axios'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextData, contextData } = useData()
  const { currentPhase } = useContext(PhaseContext)
  const [submitting, setSubmitting] = useState(false)

  const history = useHistory()

  useEffect(() => {
    console.log('useEffect', contextData.topic)
    if (!contextData.topic) {
      history.push('/proposals/add')
    }
  }, [])

  const handleNextStep = submitProposal => {
    // Get data from form and store in context

    let formData = {
      isCustomProposal: contextData.isCustomProposal,
      title: contextData.title,
      description: contextData.description,
      additionalNotes: contextData.additionalNotes,
      chooseMessage: contextData.chooseMeMessage,
      topic: contextData.topic._id,
      saveAsDraft: !submitProposal
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

    setSubmitting(true)

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
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Finish (Review)</Typography>

      {/* TODO: Print Topic in easier to read fashion */}

      <Typography>
        {contextData.isCustomProposal
          ? 'Custom Proposal'
          : 'Supervisor Defined Proposal'}
      </Typography>

      {contextData.isCustomProposal ? null : (
        <>
          <Input
            label="Related Topic"
            value={contextData?.topic?.title}
            readOnly
          />
          <Input
            label="Supervisor"
            value={contextData?.topic?.supervisor?.displayName}
            readOnly
          />
        </>
      )}

      <Input label="Title" value={contextData.title} readOnly />
      <MultiLineInput
        label="Description"
        value={contextData.description}
        readOnly
      />
      <MultiLineInput
        label="Additional Notes"
        value={contextData.additionalNotes}
        readOnly
      />

      {contextData.isCustomProposal ? (
        <>
          <MultiLineInput
            label="Environment"
            value={contextData.environment}
            readOnly
          />
          <MultiLineInput
            label="Languages"
            value={contextData.languages}
            readOnly
          />
        </>
      ) : null}

      {currentPhase.phase === 4 ? (
        <>
          <PrimaryButton
            loading={submitting}
            onClick={() => handleNextStep(true)}
            endIcon={
              <Tooltip title="Not editable after submission">
                <HelpIcon />
              </Tooltip>
            }>
            Submit Proposal
          </PrimaryButton>
          <PrimaryButton
            loading={submitting}
            onClick={() => handleNextStep(false)}
            endIcon={
              <Tooltip title="Editable until submitted">
                <HelpIcon />
              </Tooltip>
            }>
            Save Proposal as Draft
          </PrimaryButton>
        </>
      ) : (
        <PrimaryButton
          loading={submitting}
          onClick={() => handleNextStep(true)}
          endIcon={
            <Tooltip title="Not editable after submission">
              <HelpIcon />
            </Tooltip>
          }>
          Submit Proposal
        </PrimaryButton>
      )}
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
