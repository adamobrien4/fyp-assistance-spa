import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import Autocomplete from '@material-ui/lab/AutoComplete'
import Input from './Input'

// TODO: Load courses from DB
const courses = [
  'LM051 - Computer Systems',
  'LM052 - Course 2',
  'Lm053 - Course 3'
]

const TargetCoursesInput = ({ control, error, helperText, disabled }) => {
  return (
    <Controller
      render={({ onChange, value }) => (
        <Autocomplete
          multiple
          value={value}
          options={courses}
          getOptionLabel={option => option}
          defaultValue={value}
          disabled={disabled}
          filterSelectedOptions
          renderInput={params => (
            <Input
              {...params}
              variant="outlined"
              label="Choose a Course"
              placeholder="Course"
              error={error}
              helperText={helperText}
            />
          )}
          onChange={(_, data) => onChange(data)}
        />
      )}
      name="targetCourses"
      control={control}
    />
  )
}

TargetCoursesInput.propTypes = {
  control: PropTypes.object.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string
}

export default TargetCoursesInput
