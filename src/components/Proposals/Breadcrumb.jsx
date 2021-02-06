import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../contexts/CreateProposalContext'

const Breadcrumb = props => {
  const { data } = useData()
  return (
    <div>
      <Link to="/proposals/add">Step 1</Link>
      ->
      <Link to="/proposals/add/step2" disabled={data?.step < 1}>
        Step 2
      </Link>
      {data?.isCustomProposal ? (
        <>
          ->
          <Link to="/proposals/add/step3" disabled={data?.step < 2}>
            Step 3
          </Link>
        </>
      ) : (
        <></>
      )}{' '}
      ->
      <Link to="/proposals/add/finish" disabled={data?.step < 3}>
        Finish
      </Link>
    </div>
  )
}

export default Breadcrumb
