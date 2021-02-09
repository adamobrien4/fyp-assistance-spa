import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Can } from '../Auth/Can'

import { Container, IconButton, Typography, Box } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import PrimaryButton from './PrimaryButton'

import api from '../utils/api.axios'

const ViewTopic = props => {
  let { code } = useParams()

  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState(null)

  useEffect(() => {
    api
      .get(`/topic/${code}`)
      .then(res => {
        console.log(res)
        setTopic(res.data.topic)
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

  return (
    <Container maxWidth="md">
      <IconButton
        onClick={() => {
          history.goBack()
        }}>
        <ArrowForwardIosIcon style={{ transform: 'rotate(180deg)' }} />
      </IconButton>

      <Typography variant="h4">{topic.title}</Typography>
      <Typography variant="subtitle">
        Supervisor: {topic.supervisor.displayName}
      </Typography>

      <br />

      <Typography variant="overline">Description</Typography>
      <Typography variant="body1">{topic.description}</Typography>

      {topic.additionalNotes === '' ? null : (
        <>
          <Typography variant="overline">Additional Notes</Typography>
          <Typography variant="body1">{topic.additionalNotes}</Typography>
        </>
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
        <Link to={`/proposals/add/${topic.code}`}>
          <PrimaryButton>
            Look interesting? Draft Proposal for this Topic
          </PrimaryButton>
        </Link>
      </Can>
    </Container>
  )
}
export default ViewTopic
