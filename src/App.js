import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import {
  MsalAuthenticationTemplate,
  useMsal,
  useAccount
} from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'

import api from './utils/api.axios'

import { loginRequest, config } from './config/msal-config'

import { AuthContext } from './contexts/AuthContext'
import { PhaseContext } from './contexts/PhaseContext'
import { AbilityContext } from './Auth/Can'
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
import CoordinatorManagement from './components/UserManagement/Coordinator/CoordinatorManagement'
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

import HelpPage from './components/Help/HelpPage'

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
            .then(async resp => {
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

              let phaseDoc = await api.get('/phase').catch(err => {
                console.log('Could not retrieve phase')
                console.log(err)
              })

              let phase = null

              if (phaseDoc.data.phase) {
                phase = new Phase({
                  phase: phaseDoc.data.phase._id,
                  startDate: phaseDoc.data.phase.start_date,
                  endDate: phaseDoc.data.phase.end_date
                })
              } else {
                phase = new Phase({
                  phase: 0,
                  startDate: null,
                  endDate: null
                })
              }

              console.log('phase', phase)

              // Testing
              phase = {
                phase: 1,
                startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
                endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
              }
              setCurrentPhase(phase)

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

const Pages = props => {
  const { instance } = useMsal()
  const ability = generateAbilitiesFor(props.user)
  const { currentPhase } = useContext(PhaseContext)

  const allowForPhase = phase => {
    return Array.isArray(phase)
      ? phase.includes(currentPhase.phase)
      : phase === currentPhase.phase
  }

  // Implement Can functionality to only show available routes
  return (
    <Switch>
      <Route exact path="/test">
        <Test />
      </Route>

      <Route exact path="/">
        {currentPhase.phase !== 0 ? (
          props?.user?.role ? (
            <Welcome />
          ) : (
            <NoRole />
          )
        ) : (
          <h1>Switching Phase Please Wait</h1>
        )}
      </Route>

      <Route exact path="/help">
        <HelpPage />
      </Route>

      {ability.can('manage', 'Topic') && (
        <Route path="/test" component={Test} />
      )}

      {ability.can('read', 'Topic') && allowForPhase([3, 4]) && (
        <Route exact path="/topics">
          <TopicList />
        </Route>
      )}

      <Route path="/topics/view/:code">
        <ViewTopic />
      </Route>

      {ability.can('create', 'Topic') && allowForPhase(2) && (
        <Route path="/topics/add" component={AddTopicForm} />
      )}

      {ability.can('manage', 'Topic') && allowForPhase([2, 3, 4]) && (
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

      {ability.can('manage', 'Student') && allowForPhase(1) && (
        <Route path="/student/manage">
          <StudentManagement />
        </Route>
      )}

      {ability.can('manage', 'Supervisor') && allowForPhase(1) && (
        <Route path="/supervisor/assign">
          <SupervisorAssignment />
        </Route>
      )}

      {ability.can('manage', 'Supervisor') && allowForPhase(1) && (
        <Route path="/supervisor/manage">
          <SupervisorManagement />
        </Route>
      )}

      {ability.can('manage', 'Coordinator') && allowForPhase(1) && (
        <Route path="/coordinator">
          <CoordinatorManagement />
        </Route>
      )}

      {ability.can('manage', 'Coordinator') && (
        <Route path="/settings">
          <Settings />
        </Route>
      )}

      {ability.can('update', 'Phase') && (
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
  user: PropTypes.object.isRequired
}

export default App
