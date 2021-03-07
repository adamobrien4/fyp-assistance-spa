import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import {
  MsalAuthenticationTemplate,
  useMsal,
  useAccount
} from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'

import { loginRequest, config } from './config/msal-config'

import { AuthContext } from './contexts/AuthContext'
import { PhaseContext } from './contexts/PhaseContext'
import { AbilityContext } from './Auth/Can'
import generateAbilitiesFor from './Auth/ability'
import api, { setup as apiSetup } from './utils/api.axios'
import axiosGraphInstance, { setup as graphSetup } from './utils/graph.axios'

import Topic from './Auth/Topic'
import Phase from './Auth/Phase'
import Proposal from './Auth/Proposal'

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
import ManageProposal from './components/Proposals/ManageProposal'
import ViewTopic from './components/ViewTopic'

import CreateProposal from './components/Proposals/CreateProposal'
import CreateProposalStep2 from './components/Proposals/CreateProposalStep2'
import CreateProposalFinish from './components/Proposals/CreateProposalFinish'

import NoRole from './components/NoRole'
import NotFound from './components/NotFound'

import TopicProposals from './components/TopicManagement/TopicProposals'
import ViewProposal from './components/Proposals/ViewProposal'

import PhaseManagement from './components/PhaseManagement'

import HelpPage from './components/Help/HelpPage'
import APIUnavailable from './components/APIUnavailable'

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
      console.log('Setting up api')
      apiSetup(instance, account)
        .then(r => {
          console.log('API Setup returned', r)
          graphSetup(instance, account)
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
                  setCurrentPhase(phase)

                  let userObject = {
                    role,
                    id: account.localAccountId
                  }

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
        })
        .catch(err => {
          // TODO: Handle unavailable API error
          console.log(err)
          alert('Unable to connect to API')
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

      <Route path="/api-unavailable">
        <APIUnavailable />
      </Route>

      {ability.can('read', Topic.name) && allowForPhase([3, 4]) && (
        <Route exact path="/topics">
          <TopicList />
        </Route>
      )}

      <Route path="/topics/view/:id">
        <ViewTopic />
      </Route>

      {ability.can('create', Topic.name) && allowForPhase(2) && (
        <Route path="/topics/add" component={AddTopicForm} />
      )}

      {ability.can('manage', Topic.name) && allowForPhase([2, 3, 4]) && (
        <Route path="/topics/manage" component={TopicManagement} />
      )}

      {ability.can('read', Proposal.name) && (
        <Route path="/topic/:topicId">
          <TopicProposals />
        </Route>
      )}

      {ability.can('manage', Proposal.name) && (
        <Route exact path="/proposals" component={ManageProposal} />
      )}

      {ability.can('create', Proposal.name) && (
        <Route exact path="/proposals/add/step2">
          <CreateProposalContextProvider>
            <CreateProposalStep2 />
          </CreateProposalContextProvider>
        </Route>
      )}

      {ability.can('create', Proposal.name) && (
        <Route exact path="/proposals/add/finish">
          <CreateProposalContextProvider>
            <CreateProposalFinish />
          </CreateProposalContextProvider>
        </Route>
      )}

      {ability.can('create', Proposal.name) && (
        <Route path="/proposals/add/:topicId?">
          <CreateProposalContextProvider>
            <CreateProposal />
          </CreateProposalContextProvider>
        </Route>
      )}

      {ability.can('read', Proposal.name) && (
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

      {ability.can('manage', 'Coordinator') && allowForPhase(1) && (
        <Route path="/coordinator">
          <CoordinatorManagement />
        </Route>
      )}

      {ability.can('update', Phase.name) && (
        <Route path="/phase/manage">
          <PhaseManagement />
        </Route>
      )}

      <Route component={NotFound} />
    </Switch>
  )
}

Pages.propTypes = {
  user: PropTypes.object.isRequired
}

export default App
