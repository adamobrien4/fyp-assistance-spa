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
          {
            'All topic suggestions marked as "Ready for Submission" will be submitted'
          }
          <br />
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
  const [changingSupervisionStatus, setChangingSupervisionStatus] = useState(
    false
  )

  const { currentPhase } = useContext(PhaseContext)
  const history = useHistory()

  useEffect(() => {
    refreshTopicList()
  }, [])

  const refreshTopicList = () => {
    api
      .get('/topic/me')
      .then(res => {
        console.log(res)

        let retrievedTopics = []
        let retrievedCustomTopic = false

        res.data.topics.forEach(topic => {
          if (topic.type === 'regular') {
            retrievedTopics.push(topic)
          } else if (
            topic.type === 'studentTopic' &&
            topic.status !== 'archived'
          ) {
            retrievedCustomTopic = topic
          } else {
            console.error('Unknown topic type')
            console.log(topic)
          }
        })

        setTopics(retrievedTopics)
        setCustomTopic(retrievedCustomTopic)

        // If a topic is currently selected, update it to the newly returned topic
        if (selectedTopic) {
          console.log('Has selected Topic')
          let updatedSelectedTopic = res.data.topics.filter(topic => {
            return topic._id === selectedTopic._id
          })[0]
          console.log('Updated selected Topic', updatedSelectedTopic)
          setSelectedTopic(updatedSelectedTopic)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
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

    setChangingSupervisionStatus(true)

    api
      .post('/supervisor/me/studentProjectAvailibility', body)
      .then(res => {
        refreshTopicList()
      })
      .catch(err => console.log(err))
      .finally(() => {
        setChangingSupervisionStatus(false)
      })
  }

  if (loading) {
    return <Typography>Loading ...</Typography>
  }

  return (
    <>
      {selectedTopic && (
        <TopicModal
          key={selectedTopic?._id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          topic={selectedTopic}
          refresh={refreshTopicList}
        />
      )}
      <Container maxWidth="lg">
        <Typography align="center" variant="h4">
          Topic Management
        </Typography>
        <Can I="takeActionPhaseTwo" this={currentPhase}>
          <Paper elevation={2} style={{ marginTop: '20px' }}>
            <Typography variant="h6" align="center">
              Do you want to be available to supervise student defined projects?
              (Custom Student Projects)
            </Typography>
            <center>
              <FormControlLabel
                control={
                  <Switch
                    disabled={changingSupervisionStatus}
                    checked={!!customTopic}
                    onChange={handleSuperviseStudentProjectChange}
                  />
                }
                label="Supervise Student Defined Projects"
              />
            </center>
          </Paper>
        </Can>

        <TableContainer component={Paper} style={{ margin: '20px 0' }}>
          <Table style={{ minWidth: '650px' }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title (Edit Topic)</TableCell>
                <TableCell align="center">Type</TableCell>
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
                    colSpan={4}>
                    <Typography>
                      No Supervisor Defined Topics to display
                    </Typography>
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
                    <TableCell align="center">Supervisor Defined</TableCell>
                    <TableCell align="center">
                      {topicStatusToHumanFriendlyString(topic.status)}
                    </TableCell>
                    {currentPhase.phase === 4 ? (
                      <TableCell align="right">
                        <Can I="takeActionPhaseFour" this={currentPhase}>
                          <Link to={`/topic/${topic._id}`}>
                            {topic.proposalCount} Proposals
                          </Link>
                        </Can>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        Proposals viewable in Phase 4
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}

              {customTopic ? (
                <>
                  <TableRow key={customTopic._id}>
                    <TableCell component="th" scope="row">
                      <MuiLink
                        onClick={() => openTopicDetailsDialog(customTopic)}>
                        {customTopic.title}
                      </MuiLink>
                    </TableCell>
                    <TableCell align="center">Student Defined</TableCell>
                    <TableCell align="center">
                      {topicStatusToHumanFriendlyString(customTopic.status)}
                    </TableCell>
                    {currentPhase.phase === 4 ? (
                      <TableCell align="right">
                        <Can I="takeActionPhaseFour" this={currentPhase}>
                          <Link to={`/topic/${customTopic._id}`}>
                            {customTopic.proposalCount} Proposals
                          </Link>
                        </Can>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        Proposals viewable in Phase 4
                      </TableCell>
                    )}
                  </TableRow>
                </>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>

        <Can I="takeActionPhaseTwo" this={currentPhase}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <PrimaryButton
              type="button"
              onClick={() => history.push('/topics/add')}
              style={{ flex: 1, flexGrow: 4 }}>
              Add new Topic Suggestion
            </PrimaryButton>
          </div>
        </Can>
      </Container>
    </>
  )
}
