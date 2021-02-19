import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory } from 'react-router-dom'

import { Typography, Container } from '@material-ui/core'

import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'

const formSchema = yup.object().shape({
  environment: yup.string(),
  languages: yup.string()
})

const defaultValues = {
  environment: '',
  languages: ''
}

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextData, contextData } = useData()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  const history = useHistory()

  const onSubmit = data => {
    // Get data from form and store in context

    let formData = {
      ...contextData,
      environment: data.environment,
      languages: data.languages
    }

    if (contextData?.step === 2) {
      formData.step = 3
    }

    history.push('./finish')
    setContextData(formData)
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Step 3</Typography>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <MultiLineInput
          inputRef={register}
          name="environment"
          label="Environment Required"
          error={!!errors.environment}
          helperText={errors?.environment?.message}
        />
        <MultiLineInput
          inputRef={register}
          name="languages"
          label="Languages / Technologies Required"
          error={!!errors.languages}
          helperText={errors?.languages?.message}
        />

        {/* TODO: Save as Draft or save and Submit to supervisor */}

        <PrimaryButton>Save and Continue</PrimaryButton>
      </form>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
