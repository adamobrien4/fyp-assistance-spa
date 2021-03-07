import React, { useState, useContext } from 'react'
import api from '../utils/api.axios'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

import { Container, Typography } from '@material-ui/core'

import { formSchema, defaultValues } from '../utils/yupSchemas/yupTopicSchema'

import CollapsableAlert from './CollapsableAlert'
import PrimaryButton from './PrimaryButton'
import Input from './Input'
import MultiLineInput from './MultiLineInput'
import Tags from './Tags'
import TargetCoursesInput from './TargetCoursesInput'

const AddTopicForm = props => {
  const [alert, setAlert] = useState({
    message: 'No Message Supplied',
    severity: 'info'
  })
  const [alertOpen, setAlertOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const history = useHistory()
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  const { user } = useContext(AuthContext)

  const onSubmit = data => {
    console.log(data)

    data.ownerType = user.role.toLowerCase()

    setSubmitting(true)
    api
      .post('/topic/add', data)
      .then(resp => {
        console.log(resp)
        history.push('/topics/manage')
      })
      .catch(err => {
        console.log(err)
        setAlert({ message: 'Could not add topic', severity: 'error' })
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h4" align="center">
        Create new Topic
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          inputRef={register}
          type="text"
          name="title"
          label="Title"
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <MultiLineInput
          inputRef={register}
          type="text"
          name="description"
          label="Description"
          error={!!errors.description}
          helperText={errors?.description?.message}
        />

        <Controller
          control={control}
          name="tags"
          render={({ onChange, value }) => (
            <Tags
              value={value}
              onChange={vals => {
                onChange(vals)
              }}
              error={!!errors?.tags}
              helperText={errors?.tags?.message}
            />
          )}
        />

        <MultiLineInput
          inputRef={register}
          type="text"
          name="additionalNotes"
          label="Additional Notes (Optional)"
          error={!!errors.additionalNotes}
          helperText={errors?.additionalNotes?.message}
        />

        <TargetCoursesInput
          control={control}
          label="Target Courses (Optional)"
          error={!!errors.targetCourses}
          helperText={errors?.targetCourses?.message}
        />

        <PrimaryButton loading={submitting}>Add Topic</PrimaryButton>

        <br />
        <CollapsableAlert
          open={alertOpen}
          message={alert.message}
          severity={alert.severity}
        />
      </form>
    </Container>
  )
}

export default AddTopicForm
