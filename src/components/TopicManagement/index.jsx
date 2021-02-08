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
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider
} from '@material-ui/core'

import api from '../../utils/api.axios'
import { topicStatusToHumanFriendlyString } from '../../utils/topic'

import PrimaryButton from '../PrimaryButton'
import TopicModal from './TopicModal'

const SubmissionDialog = props => {
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Submit Topic Suggestions</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to submit your topic suggestions?
          <br />
          <b>This can not be reverted</b>
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.checked}
              onChange={e => props.setChecked(e.target.checked)}
            />
          }
          label="I understand"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.setOpen(false)
            props.proceed()
          }}
          color="primary"
          disabled={!props.checked}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function TopicManagement(props) {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [willSuperviseCustomTopic, setWillSuperviseCustomTopic] = useState(
    false
  )
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)

  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false)
  const [proceedSubmissionChecked, setProceedSubmissionChecked] = useState(
    false
  )
  const [submittingTopics, setSubmittingTopics] = useState(false)

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

  const handlePreSubmitTopics = e => {
    let hasSuggestion = false
    for (let topic of topics) {
      if (topic.status === 'suggestion') {
        hasSuggestion = true
        break
      }
    }

    if (hasSuggestion) {
      setSubmissionDialogOpen(true)
    } else {
      alert(
        'You must have at least one topic marked as "Ready for Submision" before you submit your topics'
      )
    }
  }

  const handleSubmitTopics = () => {
    if (proceedSubmissionChecked) {
      console.log('Submit topics')

      setSubmittingTopics(true)

      api
        .post('/topic/submit')
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setSubmittingTopics(false)
          refreshTopicList()
        })
    }
  }

  const openTopicDetailsDialog = topic => {
    console.log(topic)
    setSelectedTopic(topic)
    setDialogOpen(true)
  }

  if (loading) {
    return <Typography>Loading ...</Typography>
  }

  if (submittingTopics) {
    return <Typography>Submitting Topics ...</Typography>
  }

  return (
    <>
      {selectedTopic ? (
        <TopicModal
          key={selectedTopic._id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          topic={selectedTopic}
          refresh={refreshTopicList}
        />
      ) : null}
      <SubmissionDialog
        open={submissionDialogOpen}
        setOpen={setSubmissionDialogOpen}
        checked={proceedSubmissionChecked}
        setChecked={setProceedSubmissionChecked}
        proceed={handleSubmitTopics}
      />
      <Container maxWidth="lg">
        <TableContainer component={Paper} style={{ margin: '20px 0' }}>
          <Table style={{ minWidth: '650px' }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Proposals</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.length === 0 ? (
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan={3}>
                    <Typography>No Topics to display</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                topics.map(topic => (
                  <>
                    <TableRow key={topic._id}>
                      <TableCell component="th" scope="row">
                        <MuiLink onClick={() => openTopicDetailsDialog(topic)}>
                          {topic.title}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="center">
                        {topicStatusToHumanFriendlyString(topic.status)}
                      </TableCell>
                      <TableCell align="right">6 Submissions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                    </TableRow>
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Link to="/topics/add">
          <Button variant="outlined">Create new Topic / Suggestion</Button>
        </Link>

        <PrimaryButton onClick={handlePreSubmitTopics}>
          Submit Suggestions
        </PrimaryButton>
      </Container>
    </>
  )
}
