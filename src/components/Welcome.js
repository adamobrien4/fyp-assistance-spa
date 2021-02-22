import React, { useContext } from 'react'
import { PhaseContext } from '../contexts/PhaseContext'
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react'
import { config } from '../config/msal-config'
import { getAccessToken } from '../msalHelpers'

import { differenceInSeconds } from 'date-fns'

function Welcome() {
  const { instance, accounts } = useMsal()
  const account = accounts[0] || {}

  const { currentPhase } = useContext(PhaseContext)

  console.log(currentPhase)

  return (
    <div>
      <AuthenticatedTemplate>
        {/* <button onClick={() => alert('Hello World')}>Get Access Token</button>
        <button onClick={() => getToken(instance, accounts[0])}>Get Access Token</button> */}
        <button onClick={() => console.log(account)}>Get Profile Data</button>
        <button
          onClick={async () => {
            let request = {
              authority: `${config.endpoints.login}/${config.auth.tenantId}`,
              scopes: config.auth.scopes.customApi,
              account: accounts[0]
            }
            let ac = await getAccessToken(instance, request)
            console.log(ac)
          }}>
          Get Access Token
        </button>
        <h1>You are logged in</h1>

        <h1>We are currently in Phase {currentPhase.phase}</h1>
        <span>{differenceInSeconds(currentPhase.endDate, new Date())}</span>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h4>Plesae login</h4>
      </UnauthenticatedTemplate>
    </div>
  )
}

export default Welcome
