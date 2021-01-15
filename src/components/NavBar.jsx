import React from 'react'
import { List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { Can } from '../Auth/Can'

const useStyles = makeStyles((theme) => ({
  navDisplayFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linkText: {
    textDecoration: 'none',
    color: 'white',
    width: '30%'
  }
}))

export default function NavBar (props) {
  const styles = useStyles()

  return (
    <AuthenticatedTemplate>
      <List component='nav' aria-labelledby='main navigation' className={styles.navDisplayFlex}>
          <ListItem button>
            <Link to='/' className={styles.linkText}>Home</Link>
          </ListItem>

          {/* Student */}
          <Can I='read' a='Topic'>
            <ListItem button>
              <Link to='/topics' className={styles.linkText}>View Topics List</Link>
            </ListItem>
          </Can>
          <Can I='manage' a='Proposal'>
            <ListItem button>
              <Link to='/proposals' className={styles.linkText}>Manage Proposals</Link>
            </ListItem>
          </Can>

          {/* Supervisor */}
          <Can I='manage' a='Topic'>
            <ListItem button>
              <Link to='/topics' className={styles.linkText}>Topics</Link>
            </ListItem>
          </Can>

          {/* Coordinator */}
          <Can I='create' a='Student'>
            <ListItem button>
              <Link to='/student/assign' className={styles.linkText}>Assign Students</Link>
            </ListItem>
          </Can>
          <Can I='manage' a='Student'>
            <ListItem button>
              <Link to='/student/manage' className={styles.linkText}>Manage Students</Link>
            </ListItem>
          </Can>
          <Can I='create' a='Supervisor'>
            <ListItem button>
              <Link to='/supervisor/assign' className={styles.linkText}>Assign Supervisors</Link>
            </ListItem>
          </Can>

          {/* Administrator */}
          <Can I='create' a='Coordinator'>
            <ListItem button>
              <Link to='/coordinator' className={styles.linkText}>Manage Coordinators</Link>
            </ListItem>
          </Can>

          <ListItem button>
            <Link to='/logout' className={styles.linkText}>Logout</Link>
          </ListItem>
      </List>
    </AuthenticatedTemplate>
  )
}
