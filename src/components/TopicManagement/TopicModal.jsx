import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import * as _ from 'lodash'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Divider,
  FormControl,
  Select,
  MenuItem,
  CircularProgress
} from '@material-ui/core'
import { Edit, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import api from '../../utils/api.axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { editFormSchema } from '../../utils/yupSchemas/yupTopicSchema.js'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Tags from '../Tags'
import TargetCoursesInput from '../TargetCoursesInput'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    flex: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  readOnlySelect: {
    width: 300,
    '&.Mui-disabled option': {
      color: 'black'
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    left: '50%'
  }
}))

const TopicModal = props => {
  const classes = useStyles()

  const defaultValues = (({
    title,
    description,
    tags,
    additionalNotes,
    targetCourses,
    status
  }) => ({
    title,
    description,
    tags,
    additionalNotes: additionalNotes || '',
    targetCourses: targetCourses || [],
    status
  }))(props.topic)

  const [editMode, setEditMode] = useState(false)
  const [savingChanges, setSavingChanges] = useState(false)

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(editFormSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  const toggleEditMode = () => {
    let edtmd = !editMode
    setEditMode(edtmd)
  }

  const compareDiffs = data => {
    let differences = _.reduce(
      data,
      function (result, value, key) {
        // Compare data and props.topics properties
        if (!_.isEqual(value, props.topic[key])) result[key] = value
        return result
      },
      {}
    )

    console.log(differences)

    return Object.keys(differences).length > 0 ? differences : null
  }

  const onSubmit = data => {
    let differences = compareDiffs(data)

    console.log(differences)

    if (differences) {
      // TODO: Send differences object to api

      api
        .post(`/topic/edit/${props.topic._id}`, differences)
        .then(res => {
          console.log(res)
          props.refresh()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setSavingChanges(false)
          toggleEditMode()
        })
    } else {
      toggleEditMode()
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.dialogOpen}
      onClose={() => {
        console.log('impement dialog close')
      }}
      aria-labelledby="max-width-dialog-title"
      style={{ zIndex: '900 !important' }}
      disableBackdropClick>
      <DialogTitle id="max-width-dialog-title">
        <IconButton onClick={toggleEditMode} disabled={savingChanges}>
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          onClick={() => {
            if (
              editMode &&
              confirm(
                'Unsaved changes will be lost!. Are you sure you want to exit?'
              ) === false
            ) {
              return
            }

            props.setDialogOpen(false)
          }}
          disabled={savingChanges}>
          <Cancel />
        </IconButton>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              width: '100%'
            }}>
            <Input
              ref={register}
              name="title"
              label="Title"
              disabled={!editMode}
              variant="outlined"
              margin="none"
              style={{ flex: '3', marginRight: '40px' }}
              error={!!errors.title}
              helperText={errors?.title?.message}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <Controller
                render={({ onChange, value }) => (
                  <Select
                    disabled={!editMode}
                    value={value}
                    onChange={onChange}>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="suggestion">Ready for Submission</MenuItem>
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
                control={control}
                error={!!errors.status}
                helperText={errors?.status?.message}
              />
            </FormControl>
          </div>
          <MultiLineInput
            inputRef={register}
            name="description"
            label="Description"
            disabled={!editMode}
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
                disabled={!editMode}
              />
            )}
          />

          <MultiLineInput
            inputRef={register}
            label="Additional Notes"
            name="additionalNotes"
            disabled={!editMode}
            error={!!errors.additionalNotes}
            helperText={errors?.additionalNotes?.message}
          />

          <TargetCoursesInput
            control={control}
            error={!!errors.targetCourses}
            helperText={errors?.targetCourses?.message}
            disabled={!editMode}
          />

          {editMode && (
            <PrimaryButton disabled={savingChanges}>Save Changes</PrimaryButton>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <>
            {savingChanges && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}

TopicModal.defaultProps = {
  topic: {},
  dialogOpen: false,
  setDialogOpen: () => {},
  refresh: () => {}
}

TopicModal.propTypes = {
  topic: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default TopicModal
