const config = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    tenantId: process.env.REACT_APP_AZURE_TENANT_ID,
    applicationResourceId: process.env.REACT_APP_AZURE_APPLICATION_RESOURCE_ID,
    scopes: {
      graph: ['user.read', 'offline_access'],
      customApi: [process.env.REACT_APP_AZURE_CUSTOM_API_SCOPE]
    }
  },
  endpoints: {
    graph: process.env.REACT_APP_MS_GRAPH_ENDPOINT,
    login: process.env.REACT_APP_MS_LOGIN_ENDPOINT,
    customApi: process.env.REACT_APP_API_URL
  },
  appRoles: {
    '170a8e98-463f-4f72-b783-963f05923afc': {
      displayName: 'Student',
      priority: 1
    },
    'de311fc8-6e4b-4ee3-8e55-c5e82319a94f': {
      displayName: 'Supervisor',
      priority: 2
    },
    'fb3c340f-81e7-4c73-bca8-637e0efc1fc2': {
      displayName: 'Coordinator',
      priority: 3
    },
    '141cfda0-c415-4aba-a6af-20bfc1a639f7': {
      displayName: 'Administrator',
      priority: 4
    }
  }
}

const msalConfig = {
  auth: {
    clientId: config.auth.clientId,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_URL
  }
}

const loginRequest = {
  authority: `${config.endpoints.login}/${config.auth.tenantId}`,
  scopes: ['user.read', 'offline_access'],
  redirectUri: process.env.REACT_APP_REDIRECT
}

export { msalConfig, loginRequest, config }
