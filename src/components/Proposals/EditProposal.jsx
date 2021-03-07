import React, { useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../utils/api.axios'

import { IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'

const EditProposal = props => {
  const [title, setTitle] = useState(props.proposal?.title || '')
  const [description, setDescription] = useState(
    props.proposal?.description || ''
  )
  const [additionalNotes, setAdditionalNotes] = useState(
    props.proposal?.additionalNotes || ''
  )
  const [environment, setEnvironment] = useState(props.proposal?.environment)
  const [languages, setLanguages] = useState(props.proposal?.languages)

  const [submittingChanges, setSubmittingChanges] = useState(false)

  const handleTitleInput = e => {
    setTitle(e.target.value)
  }

  const handleDescriptionInput = e => {
    setDescription(e.target.value)
  }

  const handleAdditionalNotesInput = e => {
    setAdditionalNotes(e.target.value)
  }

  const handleEnvironmentInput = e => {
    setEnvironment(e.target.value)
  }

  const handleLanguagesInput = e => {
    setLanguages(e.target.value)
  }

  const handleSaveChanges = () => {
    console.log('Handling Saved Changes')

    let originalProposal = { ...props.proposal }

    let changes = {}
    let hasChanges = false

    if (originalProposal.title !== title) {
      changes.title = title
      hasChanges = true
    }

    if (originalProposal.description !== description) {
      changes.description = description
      hasChanges = true
    }

    if ((originalProposal?.additionalNotes || '') !== additionalNotes) {
      changes.additionalNotes = additionalNotes
      hasChanges = true
    }

    if (originalProposal.environment !== environment) {
      changes.environment = environment
      hasChanges = true
    }

    if (originalProposal.languages !== languages) {
      changes.languages = languages
      hasChanges = true
    }

    if (!hasChanges) {
      // No changes made
      console.log('no changes made')
      return
    }

    setSubmittingChanges(true)
    api
      .post(`/proposal/edit/${originalProposal._id}`, changes)
      .then(res => {
        console.log(res)
        props.refreshProposals()
      })
      .catch(err => {
        // TODO: Inform user of error
        console.log(err)
      })
      .finally(() => {
        setSubmittingChanges(false)
      })
  }

  return (
    <>
      <Input value={title} label="Title" onChange={handleTitleInput} />
      <MultiLineInput
        value={description}
        label="Description"
        onChange={handleDescriptionInput}
      />
      <MultiLineInput
        value={additionalNotes}
        label="Additional Notes"
        onChange={handleAdditionalNotesInput}
      />

      {props.proposal.isCustomProposal ? (
        <>
          <MultiLineInput
            value={environment}
            label="Environment"
            onChange={handleEnvironmentInput}
          />
          <MultiLineInput
            value={languages}
            label="Technologies / Languages"
            onChange={handleLanguagesInput}
          />
        </>
      ) : null}

      <PrimaryButton
        fullWidth={false}
        onClick={handleSaveChanges}
        loading={submittingChanges}>
        Save Changes
      </PrimaryButton>
    </>
  )
}

EditProposal.propTypes = {
  proposal: PropTypes.object.isRequired,
  refreshProposals: PropTypes.func.isRequired
}

export default EditProposal
