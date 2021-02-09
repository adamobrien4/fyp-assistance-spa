import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Typography, Container } from '@material-ui/core'

import Input from '../Input'

import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'
import MultiLineInput from '../MultiLineInput'

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextValues, data } = useData()

  const [projectTitle, setProjectTitle] = useState(data?.title || '')
  const [projectDescription, setProjectDescription] = useState(
    data?.description || ''
  )
  const [additionalNotes, setAdditionalNotes] = useState(
    data?.additionalNotes || ''
  )
  const [chooseMeMessage, setChooseMeMessage] = useState(
    data?.chooseMeMessage || ''
  )

  useEffect(() => {}, [])

  const history = useHistory()

  const handleOnTitleChange = e => {
    setProjectTitle(e.target.value)
  }

  const handleOnDescriptionChange = e => {
    setProjectDescription(e.target.value)
  }

  const handleOnNotesChange = e => {
    setAdditionalNotes(e.target.value)
  }

  const handleOnChooseMeMessageChange = e => {
    setChooseMeMessage(e.target.value)
  }

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      ...data,
      title: projectTitle,
      description: projectDescription,
      additionalNotes: additionalNotes,
      chooseMeMessage: chooseMeMessage
    }

    if (data?.step === 1) {
      formData.step = 2
    }

    if (data?.isCustomProposal) {
      history.push('./step3')
      return setContextValues(formData)
    }

    history.push('./finish')
    setContextValues(formData)
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Step 2</Typography>

      <Input
        label="Project Title"
        onChange={handleOnTitleChange}
        value={projectTitle}
        required
      />
      <MultiLineInput
        label="Project Description"
        onChange={handleOnDescriptionChange}
        value={projectDescription}
        required
      />

      <MultiLineInput
        label="Why choose me for this topic? (Optional)"
        placeholder="Why should the topic supervisor choose your project for this topic?"
        onChange={handleOnChooseMeMessageChange}
        value={chooseMeMessage}
      />

      <MultiLineInput
        label="Additional Notes (Optional)"
        onChange={handleOnNotesChange}
        value={additionalNotes}
      />

      <PrimaryButton
        disabled={projectTitle.length === 0 || projectDescription.length === 0}
        onClick={handleNextStep}>
        Save and Continue
      </PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
