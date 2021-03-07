import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../contexts/CreateProposalContext'

const Breadcrumb = props => {
  const { contextData } = useData()
  return (
    <div>
      <Link to="/proposals/add/">Step 1</Link>
      {contextData?.isCustomProposal ? (
        <>
          ->
          <Link to="/proposals/add/step2" disabled={contextData?.step < 2}>
            Step 2
          </Link>
        </>
      ) : (
        <></>
      )}{' '}
      ->
      <Link to="/proposals/add/finish" disabled={contextData?.step < 3}>
        Finish
      </Link>
    </div>
  )
}

export default Breadcrumb
