import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Container,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'

import api from '../../utils/api.axios'

const TopicProposals = props => {
  const [loading, setLoading] = useState(false)
  const [proposals, setProposals] = useState([])

  let { topicId } = useParams()
  // Get all proposals for the current topic
  useEffect(() => {
    api
      .get(`/topic/proposals/${topicId}`)
      .then(res => {
        console.log(res)

        setProposals(res.data.proposals)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Container maxWidth="lg">
      <Typography>Student Proposals</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Student</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow key="loading_supervisor_proposals">
                <TableCell colSpan={2} align="center">
                  Loading Values ...
                </TableCell>
              </TableRow>
            ) : proposals.length === 0 ? (
              <TableRow key="no_supervisor_proposals">
                <TableCell colSpan={2} align="center">
                  No Proposals to show
                </TableCell>
              </TableRow>
            ) : (
              proposals.map(proposal => (
                <TableRow key={proposal.id}>
                  <TableCell align="left">
                    <Link to={`/proposal/view/${proposal._id}`}>
                      {proposal.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {proposal.student.displayName}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

TopicProposals.defaultProps = {
  topic: {},
  dialogOpen: false,
  setDialogOpen: () => {},
  refresh: () => {}
}

TopicProposals.propTypes = {
  topic: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default TopicProposals
