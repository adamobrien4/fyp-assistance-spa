import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Button, Typography } from '@material-ui/core'
import Input from '../Input'
import MultiLineInput from '../MultiLineInput'

import BackButton from '../Buttons/BackButton'

import api from '../../utils/api.axios'

const ViewProposal = props => {
  const [proposal, setProposal] = useState()
  const [loading, setLoading] = useState(true)
  const [submittingResponse, setSubmittingResponse] = useState(false)

  const history = useHistory()

  const { id } = useParams()

  useEffect(() => {
    api
      .get(`/proposal/${id}`)
      .then(res => {
        console.log(res)

        setProposal(res.data.proposal)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmitResponse = response => {
    setSubmittingResponse(true)
    api
      .post(`/proposal/respond/${proposal._id}`, { response })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setSubmittingResponse(false)
      })
  }

  if (loading) {
    return <h1>Loading</h1>
  }
  return (
    <Container maxWidth="lg">
      <BackButton />
      <Typography>Proposal Details</Typography>
      <Input value={proposal.title} label="Title" variant="outlined" />
      <MultiLineInput label="Description" value={proposal.description} />

      <MultiLineInput
        label="Choose Me Message"
        value={proposal.chooseMessage}
      />

      <MultiLineInput
        label="Additional Notes"
        value={proposal.additionalNotes}
      />

      {proposal.type === 'studentDefined' ? (
        <>
          <MultiLineInput label="Environment" value={proposal.environment} />
          <MultiLineInput label="Languages" value={proposal.languages} />
        </>
      ) : null}

      {/* TODO: Implement Can to see if the user has permission to view these buttons (if they are a supervisor / coodinator) */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}>
        <Button
          color="primary"
          variant="contained"
          disabled={submittingResponse}
          onClick={() => handleSubmitResponse('request_edits')}>
          Request Edits
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={submittingResponse}
          onClick={() => handleSubmitResponse('accept')}>
          Accept
        </Button>
        <Button
          color="secondary"
          variant="contained"
          disabled={submittingResponse}
          onClick={() => handleSubmitResponse('reject')}>
          Reject
        </Button>
      </div>
    </Container>
  )
}

export default ViewProposal
