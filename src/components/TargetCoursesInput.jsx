import React from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@material-ui/lab/AutoComplete'
import Input from './Input'

// TODO: Load courses from DB
const courses = [
  'LM051 - Computer Systems',
  'LM052 - Course 2',
  'Lm053 - Course 3'
]

const TargetCoursesInput = props => {
  const handleKeyDown = event => {
    switch (event.key) {
      case ',':
      case ' ': {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.value.length > 0) {
          props.onChange([...props.value, event.target.value])
        }
        break
      }
      default:
    }
  }

  return (
    <Autocomplete
      value={props.value}
      onChange={props.onChange}
      multiple
      freeSolo
      options={courses}
      getOptionLabel={option => option}
      filterSelectedOptions
      renderInput={params => {
        params.inputProps.onKeyDown = handleKeyDown
        return (
          <Input
            {...params}
            label="Search & Select Targeted Courses (Optional)"
            error={props.error}
            helperText={props.helperText}
          />
        )
      }}
    />
  )
}

TargetCoursesInput.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string
}

export default TargetCoursesInput
