import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Typography,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core'

import api from '../../utils/api.axios'

import PrimaryButton from '../PrimaryButton'
import TopicModal from './TopicModal'

export default function TopicManagement(props) {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [willSuperviseCustomTopic, setWillSuperviseCustomTopic] = useState(
    false
  )
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)

  useEffect(() => {
    refreshTopicList()

    api
      .get('/supervisor/me')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const refreshTopicList = () => {
    api
      .get('/topic/me')
      .then(res => {
        console.log(res)
        if (res.data?.topics) {
          setTopics(res.data.topics)
        }

        // If a topic is currently selected, update it to the newly returned topic
        if (selectedTopic) {
          setSelectedTopic(
            res.data.topics.filter(topic => {
              return topic._id === selectedTopic._id
            })[0]
          )
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleToggleSuperviseCustomTopic = async e => {
    api
      .post('/supervisor/me/edit', {
        superviseStudentTopics: !willSuperviseCustomTopic
      })
      .then(res => {
        console.log(res)
        setWillSuperviseCustomTopic(!willSuperviseCustomTopic)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmitTopics = e => {
    console.log('Submitting Topics')
  }

  const openTopicDetailsDialog = topic => {
    console.log(topic)
    setSelectedTopic(topic)
    setDialogOpen(true)
  }

  if (loading) {
    return <Typography>Loading ...</Typography>
  }

  return (
    <>
      {selectedTopic ? (
        <TopicModal
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          topic={selectedTopic}
          refresh={refreshTopicList}
        />
      ) : null}
      <Container maxWidth="md">
        {/* <div>
          <Typography>Student Defined Topics</Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={willSuperviseCustomTopic}
                    onChange={handleToggleSuperviseCustomTopic}
                    name="superviseCustomTopic"
                  />
                }
                label="Supervise Custom Student Topics"
              />
            </FormGroup>
          </FormControl>
        </div> */}

        <List>
          {topics.map(topic => {
            return (
              <ListItem
                key={topic._id}
                button
                onClick={() => openTopicDetailsDialog(topic)}>
                <ListItemText>{topic.title}</ListItemText>
                {/* TODO: Style status text as badge box etc */}
                <Typography>{topic.status}</Typography>
              </ListItem>
            )
          })}
        </List>

        <Link to="/topics/add">
          <Button variant="outlined">Create new Topic / Suggestion</Button>
        </Link>

        <PrimaryButton onClick={handleSubmitTopics}>
          Submit Suggestions
        </PrimaryButton>
      </Container>
    </>
  )
}
