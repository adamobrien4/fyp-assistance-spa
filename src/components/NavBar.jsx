import React from 'react'
import { List, ListItem, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { Can } from '../Auth/Can'

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

  return (
    <AuthenticatedTemplate>
      <Link to="/" className={styles.linkButton}>
        <Button className={styles.linkText} color="inherit">
          Home
        </Button>
      </Link>

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

      {/* Supervisor */}
      <Can I="manage" a="Topic">
        <Link to="/topics/manage" className={styles.linkButton}>
          <Button className={styles.linkText}>Manage Topic List</Button>
        </Link>
      </Can>

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

      {/* Administrator */}
      <Can I="create" a="Coordinator">
        <Link to="/coordinator" className={styles.linkButton}>
          <Button className={styles.linkText}>Manage Coordinators</Button>
        </Link>
      </Can>

      <Link to="/logout" className={styles.linkButton}>
        <Button className={styles.linkText}>Logout</Button>
      </Link>
    </AuthenticatedTemplate>
  )
}
