const sharedConfig = {
  auth: {
    clientId: '3ee9d15a-60e1-4aea-b21d-bd09d831e62c',
    tenantId: 'a7dbec41-2d60-49c3-a1c8-790d52eaec3c',
    applicationResourceId: 'a53c68a6-b4f3-41e0-ba01-cf96fe5d7c29',
    scopes: {
      graph: ['user.read', 'offline_access'],
      customApi: ['api://54ee17f8-21c1-4891-931d-25e1ed8cfe06/Site.Access']
    }
  },
  endpoints: {
    graph: 'https://graph.microsoft.com/v1.0',
    login: 'https://login.microsoftonline.com',
    customApi: 'http://localhost:5000'
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

const devConfig = {
  ...sharedConfig,
  endpoints: {
    graph: 'https://graph.microsoft.com/v1.0',
    login: 'https://login.microsoftonline.com',
    customApi: process.env.REACT_APP_DEV_API_URL
  }
}

const prodConfig = {
  ...sharedConfig,
  endpoints: {
    graph: 'https://graph.microsoft.com/v1.0',
    login: 'https://login.microsoftonline.com',
    customApi: process.env.REACT_APP_PROD_API_URL
  }
}

const config = process.env.REACT_APP_STAGE === 'dev' ? devConfig : prodConfig

const msalConfig = {
  auth: {
    clientId: config.auth.clientId,
    redirectUri:
      process.env.REACT_APP_STAGE === 'dev'
        ? process.env.REACT_APP_DEV_REDIRECT_URL
        : process.env.REACT_APP_PROD_REDIRECT_URL,
    postLogoutRedirectUri:
      process.env.REACT_APP_STAGE === 'dev'
        ? process.env.REACT_APP_DEV_POST_LOGOUT_URL
        : process.env.REACT_APP_PROD_POST_LOGOUT_URL
  }
}

const loginRequest = {
  authority: `${config.endpoints.login}/${config.auth.tenantId}`,
  scopes: ['user.read', 'offline_access']
}

export { msalConfig, loginRequest, config }
