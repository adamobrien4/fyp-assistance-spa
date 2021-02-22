import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { Can } from '../Auth/Can'
import generateAbilitiesFor from '../Auth/ability'

import { PhaseContext } from '../contexts/PhaseContext'
import { AuthContext } from '../contexts/AuthContext'

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

  const { user } = useContext(AuthContext)
  const { currentPhase } = useContext(PhaseContext)

  const ability = generateAbilitiesFor(user)

  return (
    <AuthenticatedTemplate>
      <Link to="/" className={styles.linkButton}>
        <Button className={styles.linkText} color="inherit">
          Home
        </Button>
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
        <Can I="manage" a="Phase">
          <Link to="/phase/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Phases</Button>
          </Link>
        </Can>
      </Can>

      <Can I="takeActionPhaseThree" this={currentPhase}>
        <Can I="manage" a="Topic">
          <Link to="/topics/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Topic List</Button>
          </Link>
        </Can>
      </Can>
      {/* Administrator */}
      <Can I="takeActionPhaseOne" this={currentPhase}>
        <Can I="create" a="Coordinator">
          <Link to="/coordinator" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Coordinators</Button>
          </Link>
        </Can>
        <Can I="manage" a="Phase">
          <Link to="/phase/manage" className={styles.linkButton}>
            <Button className={styles.linkText}>Manage Phases</Button>
          </Link>
        </Can>
      </Can>

      <Link to="/logout" className={styles.linkButton}>
        <Button className={styles.linkText}>Logout</Button>
      </Link>
    </AuthenticatedTemplate>
  )
}
