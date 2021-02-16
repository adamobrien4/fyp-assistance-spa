import React, { useState, useEffect } from 'react'
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
  TableCell
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import api from '../../utils/api.axios'

import { proposalStatusToHumanFriendlyString } from '../../utils/proposal'

import PrimaryButton from '../PrimaryButton'
import ProposalModal from './ProposalModal'

const ManageProposal = props => {
  const [supervisorProposals, setSupervisorProposals] = useState([])
  const [customProposals, setCustomProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

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
        <Typography>Supervisor Defined Proposals</Typography>
        {/* TODO: Combine tables into seperate component */}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow key="loading_supervisor_proposals">
                  <TableCell colSpan={2} align="center">
                    Loading Values ...
                  </TableCell>
                </TableRow>
              ) : supervisorProposals.length === 0 ? (
                <TableRow key="no_supervisor_proposals">
                  <TableCell colSpan={2} align="center">
                    No Proposals to show
                  </TableCell>
                </TableRow>
              ) : (
                supervisorProposals.map(proposal => (
                  <TableRow key={proposal.id}>
                    <TableCell align="left">
                      <MuiLink
                        onClick={() => {
                          setSelectedProposal(proposal)
                          setDialogOpen(true)
                        }}>
                        {proposal.title}
                      </MuiLink>
                    </TableCell>
                    <TableCell align="center">
                      {proposalStatusToHumanFriendlyString(proposal.status)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography>Custom Proposals</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow key="loading_custom_proposals">
                  <TableCell colSpan={2} align="center">
                    Loading Values ...
                  </TableCell>
                </TableRow>
              ) : customProposals.length === 0 ? (
                <TableRow key="no_custom_proposals">
                  <TableCell colSpan={2} align="center">
                    No Proposals to show
                  </TableCell>
                </TableRow>
              ) : (
                customProposals.map(proposal => (
                  <TableRow key={proposal.id}>
                    <TableCell align="left">
                      <MuiLink
                        onClick={() => {
                          setSelectedProposal(proposal)
                          setDialogOpen(true)
                        }}>
                        {proposal.title}
                      </MuiLink>
                    </TableCell>
                    <TableCell align="center">
                      {proposalStatusToHumanFriendlyString(proposal.status)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Link to="/proposals/add">
          <PrimaryButton>Create new Proposal</PrimaryButton>
        </Link>
      </Container>
    </>
  )
}

export default ManageProposal
