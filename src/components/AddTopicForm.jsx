import React, { useState } from 'react'
import api from '../utils/api.axios'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from './PrimaryButton'
import { Input } from './Input'
import { Container, FormControlLabel, Checkbox, Collapse } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/AutoComplete'

export default function AddTopicForm (props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [tags, setTags] = useState([])
  const [desiredSkills, setDesiredSkills] = useState('')
  const [targetCourses, setTargetCourses] = useState([])

  const { register, handleSubmit, watch } = useForm()

  let hasRequirements = watch('hasRequirements')
  let hasDesiredSkills = watch('hasDesiredSkills')
  let hasTargetedCourses = watch('hasTargetedCourses')

  const handleKeyDown = event => {
    switch (event.key) {
      case ',':
      case ' ': {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.value.length > 0) {
          setTargetCourses([...targetCourses, event.target.value])
        }
        break
      }
      default:
    }
  }

  const onAutocompleteChange = (e, newValue) => {
    setTargetCourses(newValue)
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   const body = {
  //     title: title,
  //     description: description,
  //     requirements: requirements,
  //     tags: tags,
  //     desiredSkills: desiredSkills,
  //     targetedCourses: targetCourses
  //   }

  //   console.log('Submitting: ', body)

  //   api.post('/topic/add', body)
  //     .then(resp => {
  //       console.log(resp)
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <Container component='main' maxWidth='md'>
      <form autoComplete='off' onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}>
        <Input
          type='text'
          name='title'
          label='Title'
          inputRef={register}
          value={title}
        />
        <Input
          type='text'
          name='description'
          label='Description'
          multiline
          rows={2}
          rowsMax={6}
          inputRef={register}
        />
        <Input
          name='tags'
          label='Tags'
          inputRef={register}
        />
        <FormControlLabel
          control={
            <Checkbox defaultChecked={false} color="primary" inputRef={register} name="hasRequirements" />
          }
          label="Does your Topic have student requirements?"
        />

        <Collapse in={hasRequirements}>
          <Input
            type='text'
            name='requirements'
            label='Requirements (optional)'
            multiline
            rows={2}
            rowsMax={6}
            inputRef={register}
          />
        </Collapse>

        <FormControlLabel
          control={
            <Checkbox defaultChecked={false} color="primary" inputRef={register} name="hasDesiredSkills" />
          }
          label="Students have desired skills?"
        />

        <Collapse in={hasDesiredSkills}>
          <Input
              type='text'
              name='desiredSkills'
              label='Desired Skills (optional)'
              multiline
              rows={2}
              rowsMax={6}
              inputRef={register}
            />
        </Collapse>

        <FormControlLabel
          control={
            <Checkbox defaultChecked={false} color="primary" inputRef={register} name="hasTargetedCourses" />
          }
          label="Is your Topic course specific?"
        />

        <Collapse in={hasTargetedCourses}>
          <Autocomplete
            multiple
            freeSolo
            options={courses}
            getOptionLabel={option => option.code + ' ' + option.title}
            value={targetCourses}
            onChange={onAutocompleteChange}
            filterSelectedOptions
            renderInput={params => {
              params.inputProps.onKeyDown = handleKeyDown
              return (
                <Input
                  name='targetedCourses'
                  {...params}
                  label='Select Targeted Courses'
                  inputRef={register}
                />
              )
            }}
          />
        </Collapse>
        <PrimaryButton>Add Topic</PrimaryButton>
      </form>
    </Container>
  )
}

const courses = [
  { code: 'LM051', title: 'Computer Systems' },
  { code: 'LM052', title: 'Course 2' },
  { code: 'Lm053', title: 'Course 3' }
]
