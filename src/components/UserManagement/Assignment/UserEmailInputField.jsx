import React from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  InputBase,
  Tooltip,
  Divider,
  IconButton,
  Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AddCircle as AddCircleIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

export default function UserEmailInputField(props) {
  const classes = useStyles()

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Student Email"
        value={props.email}
        inputProps={{
          'aria-label': 'Student Email',
          'data-testid': props.addInputTestId
        }}
        endAdornment={props.endAdornment}
        onChange={props.onChange}
      />
      <Tooltip
        title="Include @studentmail prefix"
        aria-label="Include @studentmail prefix">
        <Checkbox
          edge="start"
          disableRipple
          checked={props.includeEmailPrefix}
          onChange={props.onChangeEmailPrefix}
        />
      </Tooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={props.onAdd}
        data-testid={props.addButtonTestId}>
        <AddCircleIcon />
      </IconButton>
    </Paper>
  )
}

UserEmailInputField.propTypes = {
  email: PropTypes.string.isRequired,
  endAdornment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  includeEmailPrefix: PropTypes.bool.isRequired,
  onChangeEmailPrefix: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  addInputTestId: PropTypes.string,
  addButtonTestId: PropTypes.string
}
