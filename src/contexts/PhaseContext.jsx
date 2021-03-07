import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import Phase from '../Auth/Phase'

export const PhaseContext = createContext()

const PhaseContextProvider = props => {
  const [phase, setPhase] = useState(null)

  const setCurrentPhase = currentPhase => {
    setPhase(currentPhase)
  }

  return (
    <PhaseContext.Provider
      value={{ currentPhase: new Phase({ ...phase }), setCurrentPhase }}>
      {props.children}
    </PhaseContext.Provider>
  )
}

PhaseContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default PhaseContextProvider
