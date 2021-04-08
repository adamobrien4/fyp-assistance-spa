import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Can } from '../Auth/Can'

import { Container, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Input from './Input'
import MultiLineInput from './MultiLineInput'
import PrimaryButton from './PrimaryButton'
import BackButton from './Buttons/BackButton'

import api from '../utils/api.axios'

const useStyles = makeStyles(theme => ({
  class1: {
    marginLeft: theme.spacing(4)
  }
}))

const ViewTopic = props => {
  let { id } = useParams()

  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState(null)
  const [invalidCode, setInvalidCode] = useState(false)

  useEffect(() => {
    api
      .get(`/topic/${id}`)
      .then(res => {
        if (res.data.topic) {
          console.log(res)
          setTopic(res.data.topic)
        } else {
          setInvalidCode(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>loading ...</h1>
  }

  if (invalidCode) {
    return <h1>Invalid Topic Code</h1>
  }

  return (
    <Container maxWidth="md">
      <BackButton dense={true} />

      <Input label="Title" value={topic.title} readOnly />
      <Input label="Supervisor" value={topic.supervisor.displayName} readOnly />

      <br />

      <MultiLineInput label="Description" value={topic.description} readOnly />

      {topic.additionalNotes === '' ? null : (
        <MultiLineInput
          label="Additional Notes"
          value={topic.additionalNotes}
          readOnly
        />
      )}

      <div>
        {topic.tags.map(tag => (
          <Box
            key={tag}
            style={{
              display: 'inline-block',
              backgroundColor: '#dbdbdb',
              color: '#5b5b5b',
              margin: '0 3px',
              padding: '4px',
              borderRadius: '3px'
            }}>
            {tag}
          </Box>
        ))}
      </div>

      <Can I="create" a="Proposal">
        {topic?.hasProposal ? (
          <Typography style={{ fontSize: '17px' }} align="center">
            <Link to="/proposals">
              You already created a Proposal for this topic
            </Link>
          </Typography>
        ) : (
          <Link to={`/proposals/add/${topic._id}`}>
            <PrimaryButton type="button">
              Look interesting? Draft Proposal for this Topic
            </PrimaryButton>
          </Link>
        )}
      </Can>
    </Container>
  )
}
export default ViewTopic
