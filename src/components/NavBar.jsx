import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useMsal } from '@azure/msal-react'
import {
  Avatar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link } from 'react-router-dom'
import { Can } from '../Auth/Can'

import { PhaseContext } from '../contexts/PhaseContext'

import HomeIcon from '@material-ui/icons/Home'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import NotificationsIcon from '@material-ui/icons/Notifications'

const useStyles = makeStyles(theme => ({
  navDisplayFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'none',
    color: 'white'
  },
  linkButton: {
    margin: '0 5px'
  },
  notificationIcon: {
    color: 'white'
  }
}))

export default function NavBar(props) {
  const styles = useStyles()
  const { currentPhase } = useContext(PhaseContext)

  const history = useHistory()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const accountAbbr = account.name.split(' ').map(el => el[0])

  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)

  const handleClickProfile = event => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleCloseProfile = () => {
    setProfileAnchorEl(null)
  }

  const handleOpenNotification = event => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleCloseNotification = () => {
    setNotificationAnchorEl(null)
  }

  const handleClickNotification = path => {
    if (path) history.push(path)
    handleCloseNotification()
  }

  return (
    <Toolbar>
      <div style={{ flexGrow: 1 }}>
        <Link to="/">
          <IconButton edge="start" aria-label="home" disableRipple>
            <HomeIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Link>
        {currentPhase.phase === 3 || currentPhase.phase === 4 ? (
          <>
            <Can I="read" a={'Topic'}>
              <Link to="/topics" className={styles.linkButton}>
                <Button className={styles.linkText}>View Topics List</Button>
              </Link>
            </Can>

            <Can I="manage" a={'Proposal'}>
              <Link to="/proposals" className={styles.linkButton}>
                <Button className={styles.linkText}>My Proposals</Button>
              </Link>
            </Can>
          </>
        ) : null}

        {/* Supervisor */}
        {(currentPhase.phase === 2 ||
          currentPhase.phase === 3 ||
          currentPhase.phase === 4) && (
          <Can I="manage" a={'Topic'}>
            <Link to="/topics/manage" className={styles.linkButton}>
              <Button className={styles.linkText}>My Topics</Button>
            </Link>
          </Can>
        )}

        {/* Coordinator */}
        <Can I="manage" a="Student">
          <Link to="/student/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Students</Button>
          </Link>
        </Can>
        <Can I="manage" a="Supervisor">
          <Link to="/supervisor/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Supervisors</Button>
          </Link>
        </Can>

        {/* Administrator / Coordinator */}
        <Can I="takeActionPhaseOne" this={currentPhase}>
          <Can I="create" a="Coordinator">
            <Link to="/coordinator" className={styles.linkButton}>
              <Button className={styles.linkText}>Manage Coordinators</Button>
            </Link>
          </Can>
        </Can>
        <Can I="update" a={'Phase'}>
          <Link to="/phase/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Phases</Button>
          </Link>
        </Can>
      </div>

      {/* User Avatar */}
      <Box edge="end">
        <IconButton aria-label="notifications" disableRipple>
          <NotificationsIcon
            onClick={handleOpenNotification}
            fontSize={props.notifications.length ? 'large' : 'medium'}
            className={styles.notificationIcon}
          />
        </IconButton>

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
          {props.notifications.map(el => (
            <MenuItem
              key={el._id}
              onClick={() => handleClickNotification(el?.path)}>
              <ListItemText primary={el.title} />
              <ListItemText secondary={el.created_at.toString()} />
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* User Avatar */}
      <Box edge="end">
        <Button
          disableRipple
          aria-label="delete"
          onClick={handleClickProfile}
          endIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Avatar style={{ color: 'white' }}>{accountAbbr}</Avatar>
        </Button>

        <Menu
          anchorEl={profileAnchorEl}
          keepMounted
          open={Boolean(profileAnchorEl)}
          onClose={handleCloseProfile}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <MenuItem
            onClick={() => {
              instance.logout({
                onRedirectNavigate: process.env.REACT_APP_REDIRECT_URL
              })
              setProfileAnchorEl(null)
            }}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  )
}

NavBar.propTypes = {
  notifications: PropTypes.array.isRequired
}
