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
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { Edit, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import MultiLineInput from '../MultiLineInput'
import Tags from '../Tags'

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
  }
}))

const TopicModal = props => {
  const classes = useStyles()

  const [status, setStatus] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [tags, setTags] = useState([])

  const topic = { ...props.topic }

  const handleDialogClose = () => {
    setEditMode(false)
    props.setDialogOpen(false)
  }

  const handleStatusChange = e => {
    setStatus(e.target.value)
  }

  const toggleEditMode = () => {
    let edtmd = !editMode
    setEditMode(edtmd)
  }

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.dialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="max-width-dialog-title"
      style={{ zIndex: '900 !important' }}>
      <DialogTitle id="max-width-dialog-title">
        <IconButton onClick={toggleEditMode}>
          <Edit />
        </IconButton>
        <IconButton edge="end">
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
            value={topic?.title}
            disabled={!editMode}
            variant="outlined"
            style={{ flex: '3', marginRight: '40px' }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            {/* Fix Status label from intercepting with input outline */}
            <InputLabel
              id="demo-simple-select-outlined-label"
              variant="outlined">
              {topic?.status}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={status}
              onChange={handleStatusChange}
              label="Age"
              disabled={!editMode}
              className={editMode ? null : classes.readOnlySelect}>
              <MenuItem value={'suggestion'}>Draft</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'archived'}>Archived</MenuItem>
            </Select>
          </FormControl>
        </div>
        <MultiLineInput
          label="Description"
          value={topic?.description}
          disabled={!editMode}
        />
        <Tags tags={tags} setTags={setTags} />
        <MultiLineInput
          label="Requirements"
          value={topic?.requirements}
          disabled={!editMode}
        />
        <MultiLineInput
          label="Desired Skills"
          value={topic?.desiredSkills}
          disabled={!editMode}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TopicModal.propTypes = {
  topic: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired
}

export default TopicModal
