import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import { FormControl, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import MultiLineInput from '../MultiLineInput'
import Input from '../Input'
import Tags from '../Tags'
import TargetCoursesInput from '../TargetCoursesInput'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    flex: 1
  }
}))

const RegularTopicModalContents = props => {
  const classes = useStyles()
  return (
    <>
      <Input
        ref={props.register}
        name="title"
        label="Title"
        readOnly={!props.editMode}
        error={!!props.errors.title}
        helperText={props.errors?.title?.message}
      />
      <MultiLineInput
        inputRef={props.register}
        name="description"
        label="Description"
        readOnly={!props.editMode}
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
        readOnly={!props.editMode}
        error={!!props.errors.additionalNotes}
        helperText={props.errors?.additionalNotes?.message}
      />

      <TargetCoursesInput
        control={props.control}
        error={!!props.errors.targetCourses}
        helperText={props.errors?.targetCourses?.message}
        disabled={!props.editMode}
      />

      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <label>Status</label>
        <Controller
          render={({ onChange, value }) => (
            <Select
              disabled={!props.editMode}
              value={value}
              onChange={onChange}>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="archived" style={{ color: 'red' }}>
                Archived
              </MenuItem>
              <MenuItem value="active" disabled>
                Active
              </MenuItem>
              <MenuItem value="assigned" disabled>
                Assigned
              </MenuItem>
              <MenuItem value="prev_term" disabled>
                From Previous Term
              </MenuItem>
            </Select>
          )}
          name="status"
          control={props.control}
          error={!!props.errors.status}
          helperText={props.errors?.status?.message}
        />
      </FormControl>
    </>
  )
}

RegularTopicModalContents.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired
}

export default RegularTopicModalContents
