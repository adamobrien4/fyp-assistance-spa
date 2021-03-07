import React, { useState, useEffect, useContext } from 'react'
import { PhaseContext } from '../../contexts/PhaseContext'
import { Can } from '../../Auth/Can'
import PropTypes from 'prop-types'
import {
  Container,
  Typography,
  Link as MuiLink,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'

import api from '../../utils/api.axios'

import { proposalStatusToHumanFriendlyString } from '../../utils/proposal'

import ProposalModal from './ProposalModal'

const NextActionButton = props => {
  switch (props.status) {
    case 'draft':
      return (
        <Button onClick={() => props.updateStatus(props.proposalId)}>
          Submit Proposal
        </Button>
      )
    case 'pending_edits':
      return (
        <Button onClick={() => props.updateStatus(props.proposalId)}>
          Submit Updated Proposal
        </Button>
      )
    case 'submitted':
      return (
        <Can I="takeActionPhaseThree" this={props.currentPhase}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={() => props.downgradeStatus(props.proposalId)}>
            Convert to Draft
          </Button>
        </Can>
      )
    default:
      return null
  }
}

NextActionButton.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  downgradeStatus: PropTypes.func.isRequired,
  proposalId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  currentPhase: PropTypes.object.isRequired
}

const ProposalsTable = props => {
  const history = useHistory()
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>For Topic</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.loading ? (
            <TableRow key="loading_supervisor_proposals">
              <TableCell colSpan={4}>Loading Values ...</TableCell>
            </TableRow>
          ) : props.values.length === 0 ? (
            <TableRow key="no_supervisor_proposals">
              <TableCell colSpan={4}>No Proposals to show</TableCell>
            </TableRow>
          ) : (
            props.values.map(proposal => (
              <TableRow key={proposal.id}>
                <TableCell>
                  <MuiLink
                    onClick={() => {
                      props.setSelectedProposal(proposal)
                      props.setDialogOpen(true)
                    }}>
                    {proposal.title}
                  </MuiLink>
                </TableCell>
                <TableCell>
                  <MuiLink
                    onClick={() =>
                      history.push(`/topics/view/${proposal.topic._id}`)
                    }>
                    {proposal.topic.title}
                  </MuiLink>
                </TableCell>
                <TableCell>
                  {proposalStatusToHumanFriendlyString(proposal.status)}
                </TableCell>
                <TableCell align="right">
                  <NextActionButton
                    status={proposal.status}
                    proposalId={proposal._id}
                    updateStatus={props.updateStatus}
                    downgradeStatus={props.downgradeStatus}
                    currentPhase={props.currentPhase}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ProposalsTable.propTypes = {
  values: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setSelectedProposal: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  downgradeStatus: PropTypes.func.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  currentPhase: PropTypes.object.isRequired
}

const ManageProposal = props => {
  const [supervisorProposals, setSupervisorProposals] = useState([])
  const [customProposals, setCustomProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { currentPhase } = useContext(PhaseContext)

  useEffect(() => {
    refreshProposalList()
  }, [])

  const refreshProposalList = () => {
    api
      .get('/proposal/me')
      .then(res => {
        console.log(res)

        let supervisor = res.data.proposals.filter(
          proposal => proposal.type === 'supervisorDefined'
        )
        let custom = res.data.proposals.filter(
          proposal => proposal.type === 'studentDefined'
        )

        console.log(supervisor)
        console.log(custom)

        setSupervisorProposals(supervisor)
        setCustomProposals(custom)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const setDialogOpenFunc = val => {
    if (!val) {
      setSelectedProposal(null)
    }
    setDialogOpen(val)
  }

  const updateStatus = proposalId => {
    api
      .post(`/proposal/${proposalId}/upgrade`)
      .then(res => {
        console.log(res)
        refreshProposalList()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const downgradeStatus = proposalId => {
    api
      .post(`/proposal/${proposalId}/downgrade`)
      .then(res => {
        console.log(res)
        refreshProposalList()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {selectedProposal ? (
        <ProposalModal
          key={selectedProposal._id}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpenFunc}
          proposal={selectedProposal}
          refresh={refreshProposalList}
        />
      ) : null}
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Proposal Management
        </Typography>
        {currentPhase.phase !== 4 ? (
          <Typography align="center">
            Supervisors will be available to respond to Proposals during Phase 4
          </Typography>
        ) : null}
        <Typography>Supervisor Topic Proposals</Typography>
        <ProposalsTable
          loading={loading}
          values={supervisorProposals}
          updateStatus={updateStatus}
          downgradeStatus={downgradeStatus}
          setSelectedProposal={setSelectedProposal}
          setDialogOpen={setDialogOpen}
          currentPhase={currentPhase}
        />

        <Typography>Custom Proposals</Typography>
        <ProposalsTable
          loading={loading}
          values={customProposals}
          updateStatus={updateStatus}
          downgradeStatus={downgradeStatus}
          setSelectedProposal={setSelectedProposal}
          setDialogOpen={setDialogOpen}
          currentPhase={currentPhase}
        />
      </Container>
    </>
  )
}

export default ManageProposal
