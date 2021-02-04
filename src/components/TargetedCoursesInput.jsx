import React from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@material-ui/lab/AutoComplete'
import Input from './Input'

// TODO: Load courses from DB
const courses = [
  { code: 'LM051', title: 'Computer Systems' },
  { code: 'LM052', title: 'Course 2' },
  { code: 'Lm053', title: 'Course 3' }
]

const TargetedCoursesInput = props => {
  const handleKeyDown = event => {
    switch (event.key) {
      case ',':
      case ' ': {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.value.length > 0) {
          props.setTargetCourses([...props.targetCourses, event.target.value])
        }
        break
      }
      default:
    }
  }

  const onAutocompleteChange = (e, newValue) => {
    props.setTargetCourses(newValue)
  }

  return (
    <Autocomplete
      disabled={props.disabled}
      multiple
      freeSolo
      options={courses}
      getOptionLabel={option => option.code + ' ' + option.title}
      value={props.targetCourses}
      onChange={onAutocompleteChange}
      filterSelectedOptions
      renderInput={params => {
        params.inputProps.onKeyDown = handleKeyDown
        return props.register ? (
          <Input
            name="targetedCourses"
            {...params}
            label="Select Targeted Courses"
            error={!!props.errors.targetedCourses}
            helperText={props.errors?.targetedCourses?.message}
            inputRef={props.register}
          />
        ) : (
          <Input
            name="targetedCourses"
            {...params}
            label="Select Targeted Courses"
          />
        )
      }}
    />
  )
}

TargetedCoursesInput.defaultProps = {
  register: null,
  errors: {},
  updateTargetCourses: () => {
    return null
  },
  disabled: false
}

TargetedCoursesInput.propTypes = {
  targetCourses: PropTypes.array.isRequired,
  setTargetCourses: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.object,
  disabled: PropTypes.bool
}

export default TargetedCoursesInput
