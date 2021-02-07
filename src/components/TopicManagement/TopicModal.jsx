import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
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

import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Tags from '../Tags'
import TargetedCoursesInput from '../TargetCoursesInput'

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
  console.log(props.topic)
  const classes = useStyles()

  const [status, setStatus] = useState(props.topic.status)
  const [editMode, setEditMode] = useState(false)
  const [tags, setTags] = useState(
    props.topic?.tags ? [...props.topic?.tags] : []
  )

  // Create state for each entry box
  const [title, setTitle] = useState(props.topic.title)
  const [description, setDescription] = useState(props.topic.title)
  const [additionalNotes, setAdditionalNotes] = useState(
    props.topic.additionalNotes
  )
  const [targetCourses, setTargetCourses] = useState([
    ...props.topic.targetedCourses
  ])
  const [edits, setEdits] = useState({})

  const [savingChanges, setSavingChanges] = useState(false)

  const onChangeTitle = e => {
    setTitle(e.target.value)
    if (editMode) setEdits({ title: e.target.value })
  }

  const onChangeDescription = e => {
    setDescription(e.target.value)
    if (editMode) setEdits({ description: e.target.value })
  }

  const onChangeAdditionalNotes = e => {
    setAdditionalNotes(e.target.value)
    if (editMode) setEdits({ additionalNotes: e.target.value })
  }

  const handleDialogClose = () => {
    setTitle(props.topic.title)
    setDescription(props.topic.description)
    setStatus(props.topic.status)
    setTags(props.topic.tags)
    setAdditionalNotes(props.topic.additionalNotes)
    setTargetCourses(props.topic.targetedCourses)
    setEdits({})

    setEditMode(false)
    props.setDialogOpen(false)
  }

  const onChangeStatus = e => {
    setStatus(e.target.value)
    if (editMode) setEdits({ status: e.target.value })
  }

  const toggleEditMode = () => {
    if (Object.keys(edits).length !== 0 && edits.constructor === Object) {
      // Object has been edited
      // TODO: Ask the user if they want to discard their changes or save
      console.log('Ask to discard edits')
    }

    let edtmd = !editMode
    setEditMode(edtmd)
    setEdits({})
  }

  const handleSaveChanges = e => {
    console.log('Save Changes')

    if (Object.keys(edits).length > 0) {
      setSavingChanges(true)

      let currentEdits = { ...edits, tags: [...tags] }

      api
        .post(`/topic/edit/${props.topic._id}`, currentEdits)
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
      onClose={handleDialogClose}
      aria-labelledby="max-width-dialog-title"
      style={{ zIndex: '900 !important' }}
      disableBackdropClick>
      <DialogTitle id="max-width-dialog-title">
        <IconButton onClick={toggleEditMode}>
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDialogClose}>
          <Cancel />
        </IconButton>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%'
          }}>
          <TextField
            label="Title"
            value={title}
            onChange={onChangeTitle}
            disabled={!editMode}
            variant="outlined"
            style={{ flex: '3', marginRight: '40px' }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            {/* Fix Status label from intercepting with input outline */}

            <Select
              onChange={onChangeStatus}
              disabled={!editMode}
              value={status}>
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
          </FormControl>
        </div>
        <MultiLineInput
          label="Description"
          value={description}
          onChange={onChangeDescription}
          disabled={!editMode}
        />
        <Tags tags={tags} setTags={setTags} disabled={!editMode} />
        <MultiLineInput
          label="Additional Notes"
          value={additionalNotes}
          onChange={onChangeAdditionalNotes}
          disabled={!editMode}
        />
        <TargetedCoursesInput
          targetCourses={targetCourses}
          setTargetCourses={setTargetCourses}
          disabled={!editMode}
        />
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <>
            <PrimaryButton onClick={handleSaveChanges} disabled={savingChanges}>
              Save Changes
            </PrimaryButton>
            {savingChanges && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}

TopicModal.propTypes = {
  topic: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default TopicModal
