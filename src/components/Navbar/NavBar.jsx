import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, IconButton, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Can } from '../../Auth/Can'

import { PhaseContext } from '../../contexts/PhaseContext'

import HomeIcon from '@material-ui/icons/Home'

import Notifications from './Notifications'
import ProfileMenu from './ProfileMenu'

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

const NavBar = props => {
  const styles = useStyles()
  const { currentPhase } = useContext(PhaseContext)

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

      <Notifications notifications={props.notifications} />

      <ProfileMenu />
    </Toolbar>
  )
}

NavBar.propTypes = {
  notifications: PropTypes.array.isRequired
}

export default NavBar
