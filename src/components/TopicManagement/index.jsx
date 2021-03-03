import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

import {
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
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
  Switch
} from '@material-ui/core'

import { PhaseContext } from '../../contexts/PhaseContext'

import api from '../../utils/api.axios'
import { topicStatusToHumanFriendlyString } from '../../utils/topic'

import { Can } from '../../Auth/Can'

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

SubmissionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  proceed: PropTypes.func.isRequired
}

export default function TopicManagement(props) {
  const [topics, setTopics] = useState([])
  const [customTopic, setCustomTopic] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)

  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false)
  const [proceedSubmissionChecked, setProceedSubmissionChecked] = useState(
    false
  )
  const [submittingTopics, setSubmittingTopics] = useState(false)
  const [submitAllowed, setSubmitAllowed] = useState(false)

  const { currentPhase } = useContext(PhaseContext)
  const history = useHistory()

  useEffect(() => {
    refreshTopicList()

    api
      .get('/me/studentProjectAvailibility')
      .then(res => {
        console.log(res)

        setCustomTopic(res.data.topic)
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

        let retrievedTopics = []
        let customTopic = false

        let hasSuggestionReady = false

        res.data.topics.forEach(topic => {
          if (topic.type === 'regular') {
            retrievedTopics.push(topic)
          } else if (
            topic.type === 'studentTopic' &&
            topic.status !== 'archived'
          ) {
            customTopic = topic
          } else {
            console.error('Unknown topic type')
            console.log(topic)
          }

          if (topic.status === 'suggestion') {
            hasSuggestionReady = true
          }
        })

        setSubmitAllowed(hasSuggestionReady)

        setTopics(retrievedTopics)
        setCustomTopic(customTopic)

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

  const handleSuperviseStudentProjectChange = e => {
    let body = {
      active: e.target.checked
    }

    console.log(body)

    api
      .post('/supervisor/me/studentProjectAvailibility', body)
      .then(res => {
        refreshTopicList()
      })
      .catch(err => console.log(err))
      .finally(() => {})
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
        <Can I="takeActionPhaseTwo" this={currentPhase}>
          <Typography>
            Do you want to be available to supervise student defined projects?
            (Custom Student Projects)
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={customTopic}
                onChange={handleSuperviseStudentProjectChange}
              />
            }
            label="Supervise Student Defined Projects"
          />
        </Can>

        <TableContainer component={Paper} style={{ margin: '20px 0' }}>
          <Table style={{ minWidth: '650px' }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">
                  {currentPhase.phase === 4 ? 'Proposals' : 'Actions'}
                </TableCell>
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
                  <TableRow key={topic._id}>
                    <TableCell component="th" scope="row">
                      <MuiLink onClick={() => openTopicDetailsDialog(topic)}>
                        {topic.title}
                      </MuiLink>
                    </TableCell>
                    <TableCell align="center">
                      {topicStatusToHumanFriendlyString(topic.status)}
                    </TableCell>
                    {currentPhase.phase === 4 ? (
                      <TableCell align="right">
                        <Can I="takeActionPhaseFour" this={currentPhase}>
                          <Link to={`/topic/${topic._id}`}>6 Submissions</Link>
                        </Can>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        <Button variant="contained">Next Step</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}

              {customTopic ? (
                <TableRow key={customTopic._id}>
                  <TableCell component="th" scope="row">
                    <MuiLink
                      onClick={() => openTopicDetailsDialog(customTopic)}>
                      {customTopic.title}
                    </MuiLink>
                  </TableCell>
                  <TableCell align="center">
                    {topicStatusToHumanFriendlyString(customTopic.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Can I="takeActionPhaseFour" this={currentPhase}>
                      <Link to={`/topic/${customTopic._id}`}>
                        6 Submissions
                      </Link>
                    </Can>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>

        <Can I="takeActionPhaseTwo" this={currentPhase}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <PrimaryButton
              type="button"
              onClick={() => history.push('/topics/add')}
              variant="outlined"
              style={{ flex: 1, flexGrow: 4 }}>
              Add new Topic Suggestion
            </PrimaryButton>

            {/* TODO: Inform user why the button is disabled */}
            <PrimaryButton
              disabled={!submitAllowed}
              onClick={handlePreSubmitTopics}
              style={{ flex: 1, flexGrow: 4 }}>
              Submit Suggestions
            </PrimaryButton>
          </div>
        </Can>

        <Typography>Editing a Topic</Typography>
        <Typography variant="paragraph">
          To edit a topic click on the `Topic Title` link on the table above. A
          popup should be displayed containing all the Topic information. Click
          the `Edit (Pencil)` icon in the top left to begin editing. Make any
          necessary changes to the topic, then click the `Save Changes` button
          at the bottom of the popup. To close the popup click the `Exit (X)`
          icon in the top left.
        </Typography>
        <Typography>Viewing Topic proposals</Typography>
        <Typography variant="paragraph">
          *Note: Viewing topic proposals will only become available during phase
          4. <br />
          <Link to="/help/phases">What are Phases?</Link>
          <br />
          To view all proposals students have sent to your topics, click on the
          link below the `Proposals` on the above table.
        </Typography>
      </Container>
    </>
  )
}
