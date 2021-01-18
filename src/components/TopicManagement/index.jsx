import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Button } from '@material-ui/core'

export default function TopicManagement(props) {
  const [topics, setTopics] = useState([
    {
      title: 'Topic #1',
      code: 'AOB-001'
    }
  ])

  useEffect(() => {
    console.log('Topic Management useEffect')
  }, [])

  return (
    <Container maxWidth="md">
      <h2>Topic Management</h2>
      <Link to="/topics/add">
        <Button variant="contained" color="primary">
          Create new Topic / Suggestion
        </Button>
      </Link>

      <ul>
        {topics.map(topic => {
          return <li key={topic.code}>{topic.title}</li>
        })}
      </ul>
    </Container>
  )
}
