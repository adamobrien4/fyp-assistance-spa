import React from 'react'
import api from '../utils/api.axios'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Container, Typography } from '@material-ui/core'

import PrimaryButton from './PrimaryButton'
import Input from './Input'
import MultiLineInput from './MultiLineInput'
import Tags from './Tags'
import TargetCoursesInput from './TargetCoursesInput'

const defaultValues = {
  title: '',
  description: '',
  additionalNotes: '',
  tags: [],
  targetCourses: []
}

const formSchema = yup.object().shape({
  title: yup.string().required('Topic must have a title'),
  description: yup.string().required('Toic must have a description'),
  tags: yup
    .array(yup.string())
    .min(1, 'You must specify at least one tag for your Topic'),
  additionalNotes: yup.string(),
  targetCourses: yup.array(yup.string())
})

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
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Controller
          control={control}
          name="targetCourses"
          render={({ onChange, value }) => (
            <TargetCoursesInput
              courses={courses}
              value={value}
              onChange={(_, newVal) => onChange(newVal)}
              error={!!errors.targetCourses}
              helperText={errors?.targetCourses?.message}
            />
          )}
        />

        <PrimaryButton>Add Topic</PrimaryButton>
      </form>
    </Container>
  )
}

// TODO: Load courses from DB
const courses = [
  { code: 'LM051', title: 'Computer Systems' },
  { code: 'LM052', title: 'Course 2' },
  { code: 'Lm053', title: 'Course 3' }
]

export default AddTopicForm
