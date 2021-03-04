import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import MultiLineInput from '../MultiLineInput'
import Input from '../Input'
import Tags from '../Tags'
import TargetCoursesInput from '../TargetCoursesInput'

const StudentDefinedTopicModalContents = props => {
  return (
    <>
      <Input
        inputRef={props.register}
        label="Title"
        variant="outlined"
        margin="none"
        name="title"
        inputProps={{ readOnly: true }}
      />
      <MultiLineInput
        inputRef={props.register}
        name="description"
        label="Description"
        disabled={!props.editMode}
        error={!!props.errors.description}
        helperText={props.errors?.description?.message}
      />

      <Controller
        control={props.control}
        name="tags"
        render={({ onChange, value }) => (
          <Tags
            value={value}
            onChange={vals => {
              onChange(vals)
            }}
            error={!!props.errors?.tags}
            helperText={props.errors?.tags?.message}
            disabled={!props.editMode}
          />
        )}
      />

      <MultiLineInput
        inputRef={props.register}
        label="Additional Notes"
        name="additionalNotes"
        disabled={!props.editMode}
        error={!!props.errors.additionalNotes}
        helperText={props.errors?.additionalNotes?.message}
      />

      <TargetCoursesInput
        control={props.control}
        error={!!props.errors.targetCourses}
        helperText={props.errors?.targetCourses?.message}
        disabled={!props.editMode}
      />
    </>
  )
}

StudentDefinedTopicModalContents.propTypes = {
  register: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired
}

export default StudentDefinedTopicModalContents
