import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { AuthContext } from '../contexts/AuthContext'

import { Can } from '../Auth/Can'

export default function NavBar (props) {
  const { accountType } = useContext(AuthContext)

  return (
    <AuthenticatedTemplate>
      <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {/* Student */}
        <Can I='read' a='Topic'>
          <li>
            <Link to='/topiclist'>View Topics List</Link>
          </li>
        </Can>
        <Can I='manage' a='Proposal'>
          <li>
            <Link to='/proposals'>Manage Proposals</Link>
          </li>
        </Can>

        {/* Supervisor */}
        <Can I='manage' a='Topic'>
          <li>
            <Link to='/suggestion/create'>Create Suggestion</Link>
          </li>
        </Can>

        {/* Coordinator */}
        <Can I='create' a='Student'>
          <li>
            <Link to='/student/assign'>Assign Students</Link>
          </li>
        </Can>
        <Can I='create' a='Supervisor'>
          <li>
            <Link to='/supervisor/assign'>Assign Supervisors</Link>
          </li>
        </Can>

        {/* Administrator */}
        <Can I='create' a='Coordinator'>
          <li>
            <Link to='/coordinator'>Manage Coordinators</Link>
          </li>
        </Can>

        <li>
          <Link to='/logout'>Logout</Link>
        </li>
      </ul>
      </nav>
    </AuthenticatedTemplate>
  )
}
