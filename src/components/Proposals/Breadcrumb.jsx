import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useData } from '../../contexts/CreateProposalContext'

const Breadcrumb = props => {
  const { data } = useData()
  return (
    <div>
      <Link to="/proposals/add" disabled={data?.step < 1}>
        Step 1
      </Link>
      ->
      <Link to="/proposals/add/step2" disabled={data?.step < 2}>
        Step 2
      </Link>
      {props?.isCustomProposal || data?.isCustomProposal ? (
        <>
          ->
          <Link to="/proposals/add/step3" disabled={data?.step < 3}>
            Step 3
          </Link>
        </>
      ) : (
        <></>
      )}{' '}
      ->
      <Link to="/proposals/add/finish" disabled={data?.step < 4}>
        Finish
      </Link>
    </div>
  )
}

export default Breadcrumb
