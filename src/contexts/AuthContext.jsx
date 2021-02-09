import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [role, setRole] = useState(null)

  const setAccountType = accountType => {
    setRole(accountType)
  }

  return (
    <AuthContext.Provider
      value={{ accountType: role, setAccountType: setAccountType }}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthContextProvider
