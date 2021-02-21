import React, { useEffect, useState, useContext } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import {
  MsalAuthenticationTemplate,
  useMsal,
  useAccount
} from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import PropTypes from 'prop-types'

import { loginRequest, config } from './config/msal-config'

import { AuthContext } from './contexts/AuthContext'
import { PhaseContext } from './contexts/PhaseContext'
import { AbilityContext, Can } from './Auth/Can'
import generateAbilitiesFor from './Auth/ability'
import { setup as apiSetup } from './utils/api.axios'
import axiosGraphInstance, { setup as graphSetup } from './utils/graph.axios'

import { Toolbar } from '@material-ui/core'

import { CreateProposalContextProvider } from './contexts/CreateProposalContext'

import ErrorComponent from './components/Auth/ErrorComponent'
import Loading from './components/Auth/Loading'
import AppLoading from './components/AppLoading'

import TopicManagement from './components/TopicManagement'
import TopicList from './components/TopicList'
import AddTopicForm from './components/AddTopicForm'
import Welcome from './components/Welcome'

// Student Imports
import StudentAssignment from './components/UserManagement/Assignment/StudentAssignment'
import StudentManagement from './components/UserManagement/StudentManagement'

// Supervisor Imports
import SupervisorAssignment from './components/UserManagement/Assignment/SupervisorAssignment'
import SupervisorManagement from './components/UserManagement/SupervisorManagement'

// Coordinator Imports
import ManageCoordinator from './components/ManageCoordinator'
import Header from './components/Header'
import Button from '@material-ui/core/Button'
import ManageProposal from './components/Proposals/ManageProposal'
import ViewTopic from './components/ViewTopic'

import CreateProposal from './components/Proposals/CreateProposal'
import CreateProposalStep2 from './components/Proposals/CreateProposalStep2'
import CreateProposalFinish from './components/Proposals/CreateProposalFinish'

import NoRole from './components/NoRole'
import NotFound from './components/NotFound'

import TopicProposals from './components/TopicManagement/TopicProposals'
import ViewProposal from './components/Proposals/ViewProposal'
import Settings from './components/Settings'

import PhaseManagement from './components/PhaseManagement'

import Phase from './Auth/Phase'

import Test from './components/Test'

function App() {
  const [appReady, setAppReady] = useState(false)
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})

  const { user, setUserObject } = useContext(AuthContext)
  const { setCurrentPhase } = useContext(PhaseContext)

  const authRequest = {
    ...loginRequest
  }

  useEffect(() => {
    if (account && inProgress === 'none') {
      apiSetup(instance, account)
      graphSetup(instance, account)
      // TODO: Wait on this function to finish before allowing the user to continue to the website
      // This will ensure all profile data is ready to use throughout the app
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: account
        })
        .then(async response => {
          // User is logged in
          // FIXME: This is being called twice on user login, 2 requests to ms graph
          console.log('User is logged in')

          axiosGraphInstance
            .get(`${config.endpoints.graph}/me/appRoleAssignments`)
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

              // TODO: Get current system phase
              setCurrentPhase(
                new Phase({
                  phase: 3,
                  startDate: new Date('2021-02-18T11:30:00.000Z'),
                  endDate: new Date('2021-02-20T11:30:00.000Z')
                })
              )

              let userObject = {
                role,
                id: account.localAccountId
              }

              console.log(userObject)

              if (userObject.role) {
                setUserObject(userObject)
                setAppReady(true)
              } else {
                // User has no assigned role
                setUserObject(userObject)
                setAppReady(true)
              }
            })
            .catch(err => {
              alert('Could not initialise your account, please try again')
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
      loadingComponent={Loading}>
      {appReady ? (
        <AbilityContext.Provider value={generateAbilitiesFor(user)}>
          <Header />
          <Toolbar />
          <Pages user={user} />
        </AbilityContext.Provider>
      ) : (
        <AppLoading />
      )}
    </MsalAuthenticationTemplate>
  )
}

function Pages(props) {
  const { instance } = useMsal()
  const ability = generateAbilitiesFor(props.user)

  console.log(ability.can('manage', 'Topic'))

  // Implement Can functionality to only show available routes
  return (
    <Switch>
      <Route exact path="/">
        {props?.user?.role ? <Welcome /> : <NoRole />}
      </Route>
      {ability.can('manage', 'Topic') && (
        <Route path="/test" component={Test} />
      )}

      {ability.can('read', 'Topic') && (
        <Route exact path="/topics">
          <TopicList />
        </Route>
      )}

      <Route path="/topics/view/:code">
        <ViewTopic />
      </Route>

      {ability.can('create', 'Topic') && (
        <Route path="/topics/add" component={AddTopicForm} />
      )}

      {ability.can('manage', 'Topic') && (
        <Route path="/topics/manage" component={TopicManagement} />
      )}

      {ability.can('read', 'Proposal') && (
        <Route path="/topic/:topicId">
          <TopicProposals />
        </Route>
      )}

      {ability.can('manage', 'Proposal') && (
        <Route exact path="/proposals" component={ManageProposal} />
      )}

      {ability.can('create', 'Proposal') && (
        <Route exact path="/proposals/add/step2">
          <CreateProposalContextProvider>
            <CreateProposalStep2 />
          </CreateProposalContextProvider>
        </Route>
      )}

      {ability.can('create', 'Proposal') && (
        <Route exact path="/proposals/add/finish">
          <CreateProposalContextProvider>
            <CreateProposalFinish />
          </CreateProposalContextProvider>
        </Route>
      )}

      {ability.can('create', 'Proposal') && (
        <Route path="/proposals/add/:topicCode?">
          <CreateProposalContextProvider>
            <CreateProposal />
          </CreateProposalContextProvider>
        </Route>
      )}

      {ability.can('read', 'Proposal') && (
        <Route exact path="/proposal/view/:id">
          <ViewProposal />
        </Route>
      )}

      {ability.can('manage', 'Student') && (
        <Route path="/student/assign">
          <StudentAssignment />
        </Route>
      )}

      {ability.can('manage', 'Student') && (
        <Route path="/student/manage">
          <StudentManagement />
        </Route>
      )}

      {ability.can('manage', 'Supervisor') && (
        <Route path="/supervisor/assign">
          <SupervisorAssignment />
        </Route>
      )}

      {ability.can('manage', 'Supervisor') && (
        <Route path="/supervisor/manage">
          <SupervisorManagement />
        </Route>
      )}

      {ability.can('manage', 'Coordinator') && (
        <Route path="/coordinator">
          <ManageCoordinator />
        </Route>
      )}

      {ability.can('manage', 'Coordinator') && (
        <Route path="/settings">
          <Settings />
        </Route>
      )}

      {ability.can('manage', 'Phase') && (
        <Route path="/phase/manage">
          <PhaseManagement />
        </Route>
      )}

      <Route path="/logout">
        {/* TODO: Delete localStorage of user role on logout 'fyp-assistance-role-type , Tidy up logout methodology  */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.removeItem('fyp-assistance-role-type')
            instance.logout({ onRedirectNavigate: 'http://localhost:3000/' })
          }}>
          Logout
        </Button>
      </Route>

      <Route component={NotFound} />
    </Switch>
  )
}

Pages.propTypes = {
  accountType: PropTypes.string.isRequired
}

export default App
