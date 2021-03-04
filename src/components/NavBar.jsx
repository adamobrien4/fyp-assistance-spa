import React, { useContext, useState } from 'react'
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
import SendIcon from '@material-ui/icons/Send'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import ChangePhase from './Development/ChangePhase'

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
  }
}))

export default function NavBar(props) {
  const styles = useStyles()
  const { currentPhase } = useContext(PhaseContext)

  const history = useHistory()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const accountAbbr = account.name.split(' ').map(el => el[0])

  console.log(account)

  const [anchorEl, setAnchorEl] = useState(null)

  console.log(currentPhase)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Toolbar>
      <div style={{ flexGrow: 1 }}>
        <Link to="/">
          <IconButton edge="start" aria-label="home">
            <HomeIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Link>
        {currentPhase.phase === 3 || currentPhase.phase === 4 ? (
          <>
            <Can I="read" a="Topic">
              <Link to="/topics" className={styles.linkButton}>
                <Button className={styles.linkText}>View Topics List</Button>
              </Link>
            </Can>

            <Can I="manage" a="Proposal">
              <Link to="/proposals" className={styles.linkButton}>
                <Button className={styles.linkText}>Manage Proposals</Button>
              </Link>
            </Can>
          </>
        ) : null}

        {/* Supervisor */}
        {(currentPhase.phase === 2 ||
          currentPhase.phase === 3 ||
          currentPhase.phase === 4) && (
          <Can I="manage" a="Topic">
            <Link to="/topics/manage" className={styles.linkButton}>
              <Button className={styles.linkText}>Manage Topic List</Button>
            </Link>
          </Can>
        )}

        {/* Coordinator */}
        <Can I="takeActionPhaseOne" this={currentPhase}>
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
        </Can>

        {/* Administrator / Coordinator */}
        <Can I="takeActionPhaseOne" this={currentPhase}>
          <Can I="create" a="Coordinator">
            <Link to="/coordinator" className={styles.linkButton}>
              <Button className={styles.linkText}>Manage Coordinators</Button>
            </Link>
          </Can>
          <Can I="update" a="Phase">
            <Link to="/phase/manage" className={styles.linkButton}>
              <Button className={styles.linkText}>Manage Phases</Button>
            </Link>
          </Can>
        </Can>

        {/* Allow user to change current system phase */}
        {process.env.REACT_APP_ALLOW_USER_PHASE_CHANGE ? <ChangePhase /> : null}
      </div>

      {/* User Avatar */}
      <Box edge="end">
        <Button
          aria-label="delete"
          onClick={handleClick}
          endIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Avatar style={{ color: 'white' }}>{accountAbbr}</Avatar>
        </Button>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          {/* <MenuItem
            onClick={() => {
              history.push('/settings')
              setAnchorEl(null)
            }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              instance.logout({ onRedirectNavigate: 'http://localhost:3000/' })
              setAnchorEl(null)
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
