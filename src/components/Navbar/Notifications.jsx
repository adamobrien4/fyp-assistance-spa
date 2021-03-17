import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import api from '../../utils/api.axios'

import { formatDistanceToNow } from 'date-fns'

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText
} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  notificationIcon: {
    color: 'white'
  }
}))

const Notifications = props => {
  const classes = useStyles()
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)

  const history = useHistory()

  const handleOpenNotification = event => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleCloseNotification = () => {
    setNotificationAnchorEl(null)
  }

  const handleClickNotification = (id, path) => {
    api.post('/notification/read', { id: id }).catch(err => {
      console.log(err)
      console.log('unable to update notification')
    })
    if (path) history.push(path)
    handleCloseNotification()
  }

  return (
    <Box edge="end">
      {props.notifications.length ? (
        <IconButton aria-label="notifications" disableRipple>
          <NotificationsIcon
            onClick={handleOpenNotification}
            fontSize="large"
            className={classes.notificationIcon}
          />
        </IconButton>
      ) : null}

      <Menu
        anchorEl={notificationAnchorEl}
        keepMounted
        open={Boolean(notificationAnchorEl)}
        onClose={handleCloseNotification}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        {props.notifications.length ? (
          props.notifications.map(el => (
            <MenuItem
              key={el._id}
              onClick={() => handleClickNotification(el._id, el?.path)}
              component="div">
              <ListItemText
                primary={el.title}
                secondary={formatDistanceToNow(Date.parse(el.created_at), {
                  includeSeconds: true,
                  addSuffix: true
                })}
              />
            </MenuItem>
          ))
        ) : (
          <MenuItem key="no_notification" disableRipple>
            <ListItemText primary="No Notifications" />
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
}

export default Notifications
