/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react'

const CreateProposalContext = createContext()

export const CreateProposalContextProvider = ({ children }) => {
  const [contextData, setCntxData] = useState({
    step: 0,
    isCustomProposal: false,
    topic: null
  })

  const setContextData = values => {
    setCntxData(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <CreateProposalContext.Provider value={{ contextData, setContextData }}>
      {children}
    </CreateProposalContext.Provider>
  )
}

export const useData = () => useContext(CreateProposalContext)
