import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import api from '../../utils/api.axios'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory, useParams } from 'react-router-dom'

import { Typography, Container } from '@material-ui/core'

import Input from '../Input'

import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'
import MultiLineInput from '../MultiLineInput'

const formSchema = yup.object().shape({
  title: yup.string().required('Proposal must have a title'),
  description: yup.string().required('Proposl must have a description'),
  additionalNotes: yup.string(),
  chooseMeMessage: yup.string()
})

const CreateProposal = props => {
  const [loading, setLoading] = useState(true)
  const [validTopic, setValidTopic] = useState(false)

  // CreateProposal Context
  const { setContextData, contextData } = useData()
  const { topicId } = useParams()

  const defaultValues = {
    title: contextData?.title || '',
    description: contextData?.description || '',
    additionalNotes: contextData?.additionalNotes || '',
    chooseMeMessage: contextData?.chooseMeMessage || ''
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
    revalidate: 'onChange',
    defaultValues
  })

  const history = useHistory()

  useEffect(() => {
    if (topicId && contextData.topic === null) {
      console.log('Loading from topicId')
      api
        .get('/topic/' + topicId)
        .then(res => {
          console.log(res)

          if (res.data.topic) {
            setContextData({
              isCustomProposal: res.data.topic.type === 'studentTopic',
              topic: res.data.topic,
              step: 1
            })

            setValidTopic(true)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const onSubmit = data => {
    console.log(data)

    let formData = {
      ...contextData,
      title: data.title,
      description: data.description,
      additionalNotes: data.additionalNotes,
      chooseMeMessage: data.chooseMeMessage
    }

    if (contextData?.step === 1) {
      formData.step = 2
    }

    setContextData(formData)

    if (contextData?.isCustomProposal) {
      return history.push('./step2')
    }
    history.push('./finish')
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!validTopic) {
    return (
      <Container maxWidth="lg">
        <Typography align="center">
          Cannot create proposal without a selected topic
        </Typography>
        <PrimaryButton type="button" onClick={() => history.push('/topics')}>
          View Available Topics
        </PrimaryButton>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Step 1</Typography>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputRef={register}
          name="title"
          label="Project Title"
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <MultiLineInput
          inputRef={register}
          name="description"
          label="Project Description"
          error={!!errors.description}
          helperText={errors?.description?.message}
        />

        <MultiLineInput
          inputRef={register}
          name="chooseMeMessage"
          label="Why choose me for this topic? (Optional)"
          placeholder="Why should the topic supervisor choose your project for this topic?"
          error={!!errors.chooseMeMessage}
          helperText={errors?.chooseMeMessage?.message}
        />

        <MultiLineInput
          inputRef={register}
          name="additionalNotes"
          label="Additional Notes (Optional)"
          error={!!errors.additionalNotes}
          helperText={errors?.additionalNotes?.message}
        />

        <PrimaryButton>Save and Continue</PrimaryButton>
      </form>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
