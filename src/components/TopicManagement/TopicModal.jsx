import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  DialogActions,
  Divider,
  CircularProgress
} from '@material-ui/core'
import { Edit, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import api from '../../utils/api.axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { editFormSchema } from '../../utils/yupSchemas/yupTopicSchema.js'

import PrimaryButton from '../PrimaryButton'

import RegularTopicModalContents from './RegularTopicModalContents'
import StudentDefinedTopicModalContents from './StudentDefinedTopicModalContents'

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
  },
  dialogCloseButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    fontSize: '28px'
  },
  dialogEditButton: {
    marginBottom: theme.spacing(1)
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

  console.log(errors)

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
      <IconButton
        className={classes.dialogCloseButton}
        onClick={() => {
          if (
            editMode &&
            // eslint-disable-next-line no-restricted-globals
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
      <DialogTitle id="max-width-dialog-title">
        <Button
          variant="contained"
          className={classes.dialogEditButton}
          color={editMode ? 'secondary' : 'primary'}
          onClick={toggleEditMode}
          disabled={savingChanges}
          endIcon={<Edit />}>
          Toggle Edit Mode
        </Button>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {props.topic.type === 'regular' ? (
            <RegularTopicModalContents
              register={register}
              control={control}
              errors={errors}
              editMode={editMode}
            />
          ) : (
            <StudentDefinedTopicModalContents
              register={register}
              control={control}
              errors={errors}
              editMode={editMode}
            />
          )}

          {editMode && (
            <PrimaryButton loading={savingChanges}>Save Changes</PrimaryButton>
          )}
        </form>
      </DialogContent>
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
