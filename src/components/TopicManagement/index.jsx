import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Button, Typography } from '@material-ui/core'

import api from '../../utils/api.axios'

export default function TopicManagement(props) {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/topic')
      .then(res => {
        console.log(res)
        if (res.data?.topics) {
          setTopics(res.data.topics)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container maxWidth="md">
      <h2>Topic Management</h2>
      <Link to="/topics/add">
        <Button variant="contained" color="primary">
          Create new Topic / Suggestion
        </Button>
      </Link>

      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <ul>
          {topics.map(topic => {
            return <li key={topic.code}>{topic.title}</li>
          })}
        </ul>
      )}
    </Container>
  )
}
