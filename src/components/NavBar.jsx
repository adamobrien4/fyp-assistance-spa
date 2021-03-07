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

import Topic from '../Auth/Topic'
import Proposal from '../Auth/Proposal'
import Phase from '../Auth/Phase'

import { PhaseContext } from '../contexts/PhaseContext'

import HomeIcon from '@material-ui/icons/Home'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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

  const [anchorEl, setAnchorEl] = useState(null)

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
            <Can I="read" a={Topic.name}>
              <Link to="/topics" className={styles.linkButton}>
                <Button className={styles.linkText}>View Topics List</Button>
              </Link>
            </Can>

            <Can I="manage" a={Proposal.name}>
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
          <Can I="manage" a={Topic.name}>
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
        <Can I="update" a={Phase.name}>
          <Link to="/phase/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Phases</Button>
          </Link>
        </Can>
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
          <MenuItem
            onClick={() => {
              instance.logout({
                onRedirectNavigate: process.env.REACT_APP_REDIRECT_URL
              })
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
