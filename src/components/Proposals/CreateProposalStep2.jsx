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

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      ...data,
      title: projectTitle,
      description: projectDescription,
      additionalNotes: additionalNotes
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
      <Breadcrumb
        step={data.step}
        customProposal={data.formType === 'student_defined'}
      />
      <Typography>Create Proposal - Step 2</Typography>

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

      <PrimaryButton
        disabled={projectTitle.length === 0 || projectDescription.length === 0}
        onClick={handleNextStep}>
        Next Step
      </PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
