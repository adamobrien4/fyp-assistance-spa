import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [user, setUser] = useState(null)

  const setUserObject = userObject => {
    setUser(userObject)
  }

  return (
    <AuthContext.Provider value={{ user: user, setUserObject: setUserObject }}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthContextProvider
