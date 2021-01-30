import React, { createContext, useState, useContext } from 'react'

const CreateProposalContext = createContext()

export const CreateProposalContextProvider = ({ children }) => {
  const [data, setData] = useState({})

  const setContextValues = values => {
    setData(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <CreateProposalContext.Provider value={{ data, setContextValues }}>
      {children}
    </CreateProposalContext.Provider>
  )
}

export const useData = () => useContext(CreateProposalContext)
