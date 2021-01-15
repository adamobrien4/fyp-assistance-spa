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
import { setup as apiSetup } from './utils/api.axios'
import axiosGraphInstance, { setup as graphSetup } from './utils/graph.axios'

import ErrorComponent from './components/Auth/ErrorComponent'
import Loading from './components/Auth/Loading'
import AppLoading from './components/AppLoading'

import TopicManagement from './components/TopicManagement'
import AddTopicForm from './components/AddTopicForm'
import Welcome from './components/Welcome'
import StudentAssignment from './components/UserAssignment/StudentAssignment'
import SupervisorAssignment from './components/UserAssignment/SupervisorAssignment'
import ManageCoordinator from './components/ManageCoordinator'
import Header from './components/Header'
import Button from '@material-ui/core/Button'
import ManageStudent from './components/UserRemoval/ManageStudent'

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
      apiSetup(instance, account)
      graphSetup(instance, account)
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
                instance.logout(account)
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
              setAppReady(true)

              localStorage.setItem('fyp-assistance-role-type', JSON.stringify({
                localAccountId: account.localAccountId,
                role: role
              }))
            } else {
              alert('You have no assigned role')
              instance.logout(account)
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
          <Header />
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

  // Implement Can functionality to only show available routes
  return (
    <Switch>
      <Route path='/topics/add'>
        <AddTopicForm />
      </Route>

      <Route path='/topics'>
        <TopicManagement />
      </Route>

      <Route path='/student/assign'>
        <StudentAssignment />
      </Route>

      <Route path='/student/manage'>
        <ManageStudent />
      </Route>

      <Route path='/supervisor/assign'>
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
