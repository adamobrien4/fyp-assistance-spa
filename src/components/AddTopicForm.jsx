import React from 'react'
import api from '../utils/api.axios'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Container, Typography } from '@material-ui/core'

import { formSchema, defaultValues } from '../utils/yupSchemas/yupTopicSchema'

import PrimaryButton from './PrimaryButton'
import Input from './Input'
import MultiLineInput from './MultiLineInput'
import Tags from './Tags'
import TargetCoursesInput from './TargetCoursesInput'

const AddTopicForm = props => {
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  const onSubmit = data => {
    console.log(data)

    api
      .post('/topic/add', data)
      .then(resp => {
        console.log(resp)
        alert('Topic has been sucessfully added')

        // TODO: Redirect user to topic management screen
      })
      .catch(err => console.log(err))
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
          error={!!errors.targetCourses}
          helperText={errors?.targetCourses?.message}
        />

        <PrimaryButton>Add Topic</PrimaryButton>
      </form>
    </Container>
  )
}

export default AddTopicForm
