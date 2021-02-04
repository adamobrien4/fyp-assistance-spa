import React, { useState, useEffect } from 'react'
import api from '../utils/api.axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import PrimaryButton from './PrimaryButton'
import Input from './Input'
import {
  Container,
  FormControlLabel,
  Checkbox,
  Collapse,
  Typography
} from '@material-ui/core'
import { TreeSelect } from 'antd'
import Autocomplete from '@material-ui/lab/AutoComplete'

import TargetedCoursesInput from './TargetedCoursesInput'

import * as yup from 'yup'

import 'antd/dist/antd.css'

const { SHOW_PARENT } = TreeSelect

// TODO: Add necessary input checks
// TODO: Add validation for remaining fields
const formSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Title cannot contain numbers')
    .required('Title is required'),
  description: yup.string().required('Description is required')
})

const tagSchema = yup.array().min(1)
const requirementsSchema = yup
  .array()
  .of(yup.string().min(3))
  .min(1)
  .required('Please enter or disable requirements')
const desiredSkillsSchema = yup
  .array()
  .of(yup.string().min(3))
  .min(1)
  .required('Please enter or disable desired skills')
const targetCourseSchema = yup
  .array()
  .of(yup.string().min(3))
  .min(1, 'Please select or disable target courses')

export default function AddTopicForm(props) {
  const [tags, setTags] = useState([])
  const [targetCourses, setTargetCourses] = useState([])
  const [treeData, setTreeData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/tag')
      .then(res => {
        console.log(res)
        setTreeData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema)
  })

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

  const onSubmit = async data => {
    let targetedCourses = targetCourses.map(course => {
      return course.code
    })
    let tagsValid = await tagSchema.isValid(tags)
    let requirementsValid = data.hasRequirements
      ? await requirementsSchema.isValid(data.requirements.trim().split('\n'))
      : true
    let desiredSkillsValid = data.hasDesiredSkills
      ? await desiredSkillsSchema.isValid(data.desiredSkills.trim().split('\n'))
      : true
    let targetCourseValid = data.hasTargetedCourses
      ? await targetCourseSchema.isValid(targetedCourses)
      : true

    console.log(
      tagsValid,
      requirementsValid,
      desiredSkillsValid,
      targetCourseValid
    )

    if (
      !tagsValid ||
      !requirementsValid ||
      !desiredSkillsValid ||
      !targetCourseValid
    ) {
      return alert('Form is not valid')
    }

    console.log(data)

    const body = {
      title: data.title,
      description: data.description,
      requirements: data.hasRequirements
        ? data.requirements.trim().split('\n')
        : null,
      tags: tags,
      desiredSkills: data.hasDesiredSkills
        ? data.desiredSkills.trim().split('\n')
        : null,
      targetedCourses: data.hasTargetedCourses ? targetedCourses : null
    }

    console.log('Submitting: ', body)

    api
      .post('/topic/add', body)
      .then(resp => {
        console.log(resp)
        alert('Topic has been sucessfully added')

        // TODO: Redirect user to topic management screen
      })
      .catch(err => console.log(err))
  }

  const onTreeSelectChange = value => {
    console.log('onChange: ', value)
    setTags(value)
  }

  let tProps = {
    value: tags,
    onChange: onTreeSelectChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Search Topic Tags',
    style: {
      width: '100%'
    },
    bordered: true,
    showSearch: true
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h4" align="center">
        Create new Topic
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="title"
          label="Title"
          error={!!errors.title}
          helperText={errors?.title?.message}
          inputRef={register}
        />
        <Input
          type="text"
          name="description"
          label="Description"
          multiline
          rows={2}
          rowsMax={6}
          error={!!errors.description}
          helperText={errors?.description?.message}
          inputRef={register}
        />
        {/* TODO: Add error to TreeSelect if left empty on submit, helperText with error etc */}
        <TreeSelect treeData={treeData} {...tProps} />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              color="primary"
              inputRef={register}
              name="hasRequirements"
            />
          }
          label="Does your Topic have student requirements?"
        />

        <Collapse in={hasRequirements}>
          <Input
            type="text"
            name="requirements"
            label="Requirements"
            placeholder="A2 in data structures or related module"
            multiline
            rows={2}
            rowsMax={6}
            error={!!errors.requirements}
            helperText={errors?.requirements?.message}
            inputRef={register}
          />
        </Collapse>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              color="primary"
              inputRef={register}
              name="hasDesiredSkills"
            />
          }
          label="Students have desired skills?"
        />

        <Collapse in={hasDesiredSkills}>
          <Input
            type="text"
            name="desiredSkills"
            label="Desired Skills"
            placeholder="Experience with C++ and OpenGL"
            multiline
            rows={2}
            rowsMax={6}
            error={!!errors.desredSkills}
            helperText={errors?.desredSkills?.message}
            inputRef={register}
          />
        </Collapse>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              color="primary"
              inputRef={register}
              name="hasTargetedCourses"
            />
          }
          label="Is your Topic course specific?"
        />

        <Collapse in={hasTargetedCourses}>
          <TargetedCoursesInput
            courses={courses}
            targetCourses={targetCourses}
            setTargetCourses={setTargetCourses}
            register={register}
            errors={errors}
          />
        </Collapse>
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
