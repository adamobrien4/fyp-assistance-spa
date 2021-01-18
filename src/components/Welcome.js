import React from 'react'
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

function Welcome() {
  const { accounts } = useMsal()
  const account = accounts[0] || {}

  const onChange = (currentNode, selectedNodes) => {
    console.log('path::', currentNode)
  }

  const data = [
    {
      label: 'Neural Networks',
      children: [
        {
          label: 'ANN'
        },
        {
          label: 'CNN'
        }
      ]
    }
  ]

  return (
    <div>
      <AuthenticatedTemplate>
        {/* <button onClick={() => alert('Hello World')}>Get Access Token</button>
        <button onClick={() => getToken(instance, accounts[0])}>Get Access Token</button> */}
        <button onClick={() => console.log(account)}>Get Profile Data</button>
        <h1>You are logged in</h1>

        <DropdownTreeSelect
          data={data}
          onChange={onChange}
          showDropdown="always"
        />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h4>Plesae login</h4>
      </UnauthenticatedTemplate>
    </div>
  )
}

export default Welcome
