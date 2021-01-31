import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Typography,
  Container,
  Card,
  Box,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/styles'
import api from '../../utils/api.axios'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import EditProposal from './EditProposal'

const useStyles = makeStyles(theme => ({
  proposalListing: {
    margin: '5px 5px',
    backgroundColor: 'lightgray',
    width: '90%'
  },
  statusBadge: {
    padding: '5px 10px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    textTransform: 'capitalize',
    borderRadius: '5px'
  }
}))

const ProposalListing = props => {
  const classes = useStyles()
  return (
    <ListItem
      key={props.proposal._id}
      className={classes.proposalListing}
      button
      onClick={props.onClick}>
      {props.isCustomProposal ? (
        <StudentProposalListing proposal={props.proposal} />
      ) : (
        <SupervisorProposalListing proposal={props.proposal} />
      )}
    </ListItem>
  )
}

const SupervisorProposalListing = props => {
  const classes = useStyles()
  return (
    <>
      <ListItemText
        primary={props.proposal.title}
        secondary={props.proposal.topic.code}></ListItemText>
      <ListItemSecondaryAction className={classes.statusBadge}>
        {props.proposal.status}
      </ListItemSecondaryAction>
    </>
  )
}

const StudentProposalListing = props => {
  const classes = useStyles()
  return (
    <>
      <ListItemText
        primary={props.proposal.title}
        secondary={
          props.proposal.description.substring(0, 50) + ' ...'
        }></ListItemText>
      <ListItemSecondaryAction className={classes.statusBadge}>
        {props.proposal.status}
      </ListItemSecondaryAction>
    </>
  )
}

export default function ManageProposal(props) {
  const [loading, setLoading] = useState(true)
  const [proposals, setProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    refreshProposals()

    // setProposals(
    //   [
    //     {
    //       title: 'Image Recognition',
    //       description:
    //         'The student will apply Google Cloud Vision API or Microsoft Azure Computer Vision API to solve a real problem (e.g., use the Vision API to develop an app to assist teaching staff for the lecture/lab sign-in process).',
    //       status: 'draft',
    //       type: 'supervisor',
    //       topic: {
    //         _id: '123-345',
    //         code: 'ADC-001',
    //         supervisor: {
    //           abbr: 'JHN',
    //           displayName: 'John James'
    //         },
    //         title: 'Mdhsfjds',
    //         description: 'descrotion'
    //       }
    //     },
    //     {
    //       title: 'Various',
    //       description:
    //         'Annette is willing to supervise projects that the students themselves are interested in, in the broad area of software and software development, subject to vetting for academic-quality requirements. ',
    //       additionalNotes: 'Some additional notes',
    //       student: {
    //         _id: '2784735934',
    //         displayName: 'Adam OBrien'
    //       },
    //       status: 'draft',
    //       type: 'supervisor',
    //       topic: {
    //         _id: '123-3455',
    //         code: 'AME-001',
    //         supervisor: {
    //           abbr: 'JHN',
    //           displayName: 'John James'
    //         },
    //         title: 'Mdhsfjds',
    //         description: 'descrotion'
    //       }
    //     },
    //     {
    //       title: 'Image Recognition',
    //       description:
    //         'The student will apply Google Cloud Vision API or Microsoft Azure Computer Vision API to solve a real problem (e.g., use the Vision API to develop an app to assist teaching staff for the lecture/lab sign-in process).',
    //       status: 'draft',
    //       type: 'student',
    //       environment: 'Linux, iMac',
    //       languages: 'JavaScript, React'
    //     }
    //   ].map(proposal => {
    //     return {
    //       ...proposal,
    //       isCustomProposal: proposal.type === 'studentDefined'
    //     }
    //   })
    // )
    setLoading(false)
  }, [])

  const refreshProposals = () => {
    setIsEditing(false)
    setSelectedProposal(null)

    alert('Refreshing proposals list')

    api
      .get('/proposal/me')
      .then(res => {
        console.log(res)
        let incomingProposals = res.data.proposals.map(proposal => {
          return {
            ...proposal,
            isCustomProposal: proposal.type === 'studentDefined'
          }
        })
        setProposals(incomingProposals)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSelect = proposal => {
    if (isEditing) {
      // TODO: Ask user if they want to save any changes they have made so far
      setIsEditing(false)
    }

    console.log(proposal)
    setSelectedProposal(proposal)
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Grid container justify="center" spacing={0}>
      <Grid key={0} item style={{ width: '30%' }}>
        <Typography variant="h6">Supervisor Defined Topic Proposals</Typography>
        <List>
          {proposals
            .filter(proposal => !proposal.isCustomProposal)
            .map(proposal => {
              return (
                <ProposalListing
                  key={proposal._id}
                  isCustomProposal={false}
                  proposal={proposal}
                  onClick={() => handleSelect(proposal)}
                />
              )
            })}
        </List>

        <Typography variant="h6" margin={1}>
          Custom Topic Proposals
        </Typography>
        <List>
          {proposals
            .filter(proposal => proposal.isCustomProposal)
            .map(proposal => {
              return (
                <ProposalListing
                  key={proposal._id}
                  isCustomProposal={true}
                  proposal={proposal}
                  onClick={() => handleSelect(proposal)}
                />
              )
            })}
        </List>
        <Link to="/proposals/add">
          <PrimaryButton>Create new Proposal</PrimaryButton>
        </Link>
      </Grid>
      <Grid key={1} item style={{ width: '70%' }}>
        {selectedProposal ? (
          <>
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </IconButton>

            {isEditing ? (
              <EditProposal
                proposal={selectedProposal}
                refreshProposals={refreshProposals}
              />
            ) : (
              <>
                <Typography>View Topic Details no edit</Typography>
              </>
            )}

            {selectedProposal.isCustomProposal ? null : (
              <>
                <Typography hidden={isEditing}>Related Topic</Typography>
                <PrimaryButton hidden={isEditing}>
                  View {selectedProposal.topic.code}'s Details
                </PrimaryButton>
              </>
            )}
          </>
        ) : (
          <Typography>Select a Proposal to view its details</Typography>
        )}
      </Grid>
    </Grid>
  )
}
