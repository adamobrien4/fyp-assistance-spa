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
import VisibilityIcon from '@material-ui/icons/Visibility'
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
    setLoading(false)
  }, [])

  const refreshProposals = () => {
    setIsEditing(false)
    setSelectedProposal(null)

    api
      .get('/proposal/me')
      .then(res => {
        let incomingProposals = res.data.proposals.map(proposal => {
          return {
            ...proposal,
            isCustomProposal: proposal.type === 'studentDefined'
          }
        })

        console.log(incomingProposals)
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
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
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
