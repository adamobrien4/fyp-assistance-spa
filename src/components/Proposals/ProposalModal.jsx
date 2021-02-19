import React, { useState } from 'react'
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
  CircularProgress,
  Select,
  MenuItem
} from '@material-ui/core'
import { Edit, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import api from '../../utils/api.axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { editFormSchema } from '../../utils/yupSchemas/yupProposalSchema'

import { proposalStatuses } from '../../utils/proposal.js'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'

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

const ProposalModal = props => {
  const classes = useStyles()

  let defaultValues = (({
    status,
    description,
    chooseMessage,
    additionalNotes,
    environment,
    languages,
    type
  }) => ({
    status,
    description,
    chooseMessage: chooseMessage || '',
    additionalNotes: additionalNotes || '',
    environment,
    languages,
    type
  }))(props.proposal)

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
        // Compare data and props.proposal properties
        if (!_.isEqual(value, props.proposal[key])) result[key] = value
        return result
      },
      {}
    )

    console.log(differences)

    return Object.keys(differences).length > 0 ? differences : null
  }

  const onSubmit = data => {
    console.log('Submitting', data)
    let differences = compareDiffs(data)

    if (differences) {
      // TODO: Send differences object to api

      api
        .post(`/proposal/edit/${props.proposal._id}`, differences)
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
        {['draft', 'pending_edits'].includes(props.proposal.status) ? (
          <IconButton onClick={toggleEditMode} disabled={savingChanges}>
            <Edit />
          </IconButton>
        ) : null}

        <IconButton
          edge="end"
          onClick={() => {
            props.setDialogOpen(false)
          }}
          disabled={savingChanges}>
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
          <Input
            value={props.proposal.title}
            label="Title"
            variant="outlined"
            margin="none"
            readOnly
            style={{ flex: '3', marginRight: '40px' }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <Controller
              render={({ onChange, value }) => (
                <Select disabled={!editMode} value={value} onChange={onChange}>
                  {Object.keys(proposalStatuses).map(status => (
                    <MenuItem key={status} value={status}>
                      {proposalStatuses[status]}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="status"
              control={control}
              error={!!errors.status}
              helperText={errors?.status?.message}
            />
          </FormControl>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MultiLineInput
            inputRef={register}
            name="description"
            label="Description"
            disabled={!editMode}
            error={!!errors.description}
            helperText={errors?.description?.message}
          />

          <MultiLineInput
            inputRef={register}
            label="Choose Me Message"
            name="chooseMessage"
            disabled={!editMode}
            error={!!errors.chooseMessage}
            helperText={errors?.chooseMessage?.message}
          />

          <MultiLineInput
            inputRef={register}
            label="Additional Notes"
            name="additionalNotes"
            disabled={!editMode}
            error={!!errors.additionalNotes}
            helperText={errors?.additionalNotes?.message}
          />

          {defaultValues.type === 'studentDefined' ? (
            <>
              <MultiLineInput
                inputRef={register}
                label="Environment"
                name="environment"
                disabled={!editMode}
                error={!!errors.environment}
                helperText={errors?.environment?.message}
              />
              <MultiLineInput
                inputRef={register}
                label="Languages"
                name="languages"
                disabled={!editMode}
                error={!!errors.languages}
                helperText={errors?.languages?.message}
              />
            </>
          ) : null}

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

ProposalModal.defaultProps = {
  proposal: {},
  setDialogOpen: () => {},
  dialogOpen: true,
  refresh: () => {}
}

ProposalModal.propTypes = {
  proposal: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default ProposalModal
