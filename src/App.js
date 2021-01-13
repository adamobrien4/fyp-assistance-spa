import React, { useEffect, useState, useContext } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import { MsalAuthenticationTemplate, useMsal, useAccount } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'

import { loginRequest, config } from './config/msal-config'

import { AuthContext } from './contexts/AuthContext'
import { AbilityContext } from './Auth/Can'
import ability from './Auth/ability'
import axiosGraphInstance, { setup } from './utils/api.axios'

import ErrorComponent from './components/Auth/ErrorComponent'
import Loading from './components/Auth/Loading'
import AppLoading from './components/AppLoading'

import Suggestion from './components/Suggestion'
import Welcome from './components/Welcome'
import StudentAssignment from './components/UserAssignment/StudentAssignment'
import SupervisorAssignment from './components/UserAssignment/SupervisorAssignment'
import ManageCoordinator from './components/ManageCoordinator'
import NavBar from './components/NavBar'
import Button from '@material-ui/core/Button'

function App () {
  const [appReady, setAppReady] = useState(false)
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})

  const { accountType, setAccountType } = useContext(AuthContext)

  const authRequest = {
    ...loginRequest
  }

  useEffect(() => {
    if (account && inProgress === 'none') {
      // TODO: Wait on this function to finish before allowing the user to continue to the website
      // This will ensure all profile data is ready to use throughout the app
      instance.acquireTokenSilent({
        ...loginRequest,
        account: account
      }).then(async (response) => {
        // User is logged in
        // FIXME: This is being called twice on user login, 2 requests to ms graph
        console.log('User is logged in')

        // TODO: If role is stored in localstorage pull from here instead of querying MS graph

        const localStorageAccountRole = localStorage.getItem('fyp-assistance-role-type')
        if (localStorageAccountRole) {
          const storedRoleObject = JSON.parse(localStorageAccountRole)
          if (storedRoleObject.localAccountId === account.localAccountId) {
            console.log('Setting account role from local storage')
            setAccountType(storedRoleObject.role)
            setup(instance, account)
            setAppReady(true)
            return
          }
        }

        axiosGraphInstance.get(`${config.endpoints.graph}/me/appRoleAssignments`)
          .then(resp => {
            let rolePriority = -1
            let role = null
            for (const roleData of resp.data.value) {
              const roleObject = config.appRoles[roleData.appRoleId]

              if (!roleObject) {
                console.log('Unknown role: ' + JSON.stringify(roleData))
                continue
              }

              const { priority, displayName } = roleObject
              if (priority > rolePriority) {
                rolePriority = priority
                role = displayName
              }
            }

            if (role) {
              setAccountType(role)
              setup(instance, account)
              setAppReady(true)

              localStorage.setItem('fyp-assistance-role-type', JSON.stringify({
                localAccountId: account.localAccountId,
                role: role
              }))
            } else {
              alert('You have no assigned role')
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }, [account, inProgress, instance])

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      {appReady ? (
        <AbilityContext.Provider value={ability(accountType)}>
          <NavBar />
          <Pages />
      </AbilityContext.Provider>
      ) : (
        <AppLoading />
      )}
    </MsalAuthenticationTemplate>
  )
}

function Pages () {
  const { instance } = useMsal()

  return (
    <Switch>
      <Route path='/suggestion'>
        <Suggestion />
      </Route>

      <Route path='/student/assignment'>
        <StudentAssignment />
      </Route>

      <Route path='supervisor/assignment'>
        <SupervisorAssignment />
      </Route>

      <Route path='/coordinator'>
        <ManageCoordinator />
      </Route>

      <Route path='/logout'>
        { /* TODO: Delete localStorage of user role on logout 'fyp-assistance-role-type , Tidy up logout methodology  */ }
        <Button variant='contained' color='primary' onClick={() => instance.logout({ onRedirectNavigate: 'http://localhost:3000/' })} >Logout</Button>
      </Route>

      <Route exact path='/'>
        <Welcome />
      </Route>
    </Switch>
  )
}

export default App
