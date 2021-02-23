import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Can } from '../Auth/Can'

import { Container, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PrimaryButton from './PrimaryButton'
import BackButton from './Buttons/BackButton'

import api from '../utils/api.axios'

const useStyles = makeStyles(theme => ({
  class1: {
    marginLeft: theme.spacing(4)
  }
}))

const ViewTopic = props => {
  let { code } = useParams()

  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState(null)
  const [invalidCode, setInvalidCode] = useState(false)

  useEffect(() => {
    api
      .get(`/topic/${code}`)
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
      <BackButton dense />

      <Typography variant="h4">{topic.title}</Typography>
      <Typography variant="subtitle" className={classes.class1}>
        Supervisor: {topic.supervisor.displayName}
      </Typography>

      <br />

      <Typography variant="overline">Description</Typography>
      <Typography variant="body1" className={classes.class1}>
        {topic.description}
      </Typography>

      {topic.additionalNotes === '' ? null : (
        <>
          <Typography variant="overline">Additional Notes</Typography>
          <Typography variant="body1" className={classes.class1}>
            {topic.additionalNotes}
          </Typography>
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
        {topic?.hasProposal ? (
          <Typography style={{ fontSize: '25px' }} align="center">
            <Link to="/proposals">
              You already created a Proposal for this topic
            </Link>
          </Typography>
        ) : (
          <Link to={`/proposals/add/${topic.code}`}>
            <PrimaryButton>
              Look interesting? Draft Proposal for this Topic
            </PrimaryButton>
          </Link>
        )}
      </Can>
    </Container>
  )
}
export default ViewTopic
