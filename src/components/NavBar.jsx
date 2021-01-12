import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { AuthContext } from '../contexts/AuthContext'

export default function NavBar (props) {
  const { accountType } = useContext(AuthContext)

  const renderSwitch = () => {
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
  }

  return (
    <AuthenticatedTemplate>
      <nav>
        {renderSwitch()}
      </nav>
    </AuthenticatedTemplate>
  )
}
