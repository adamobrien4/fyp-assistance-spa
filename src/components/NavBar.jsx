import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { AuthContext } from '../contexts/AuthContext'

import { Can } from '../Can'

export default function NavBar (props) {
  const { accountType } = useContext(AuthContext)

  /*const renderSwitch = () => {
    switch (accountType) {
      case 'Student':
        return (
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        )
      case 'Supervisor':
        return (
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/suggestion'>Suggestion</Link>
            </li>
            <li>
              <Link to='/student/assignment'>Assign Students</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        )
      case 'Coordinator':
        return (
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/suggestion'>Suggestion</Link>
            </li>
            <li>
              <Link to='/student/assignment'>Assign Students</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        )
      case 'Administrator':
        return (
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/suggestion'>Suggestion</Link>
            </li>
            <li>
              <Link to='/student/assignment'>Assign Students</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        )
    }
  }*/

  return (
    <AuthenticatedTemplate>
      <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/suggestion'>Suggestion</Link>
        </li>
        <li>
          <Link to='/student/assignment'>Assign Students</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>

        <Can I='read' a='Topic'>
          <li>
            <Link to='/topics'>View Topics</Link>
          </li>
        </Can>

        <Can I='create' a='Suggestion'>
          <li>
            <Link to='/suggestion/create'>Create Suggestion</Link>
          </li>
        </Can>

        <Can I='manage' a='Student'>
          <li>
            <Link to='/manage/students'>Manage Students</Link>
          </li>
        </Can>

        <Can I='manage' this='System'>
          <li>
            <Link to='/system'>Manage System</Link>
          </li>
        </Can>
      </ul>
      </nav>
    </AuthenticatedTemplate>
  )
}
