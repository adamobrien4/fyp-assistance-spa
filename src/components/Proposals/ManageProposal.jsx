import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Typography, Container } from '@material-ui/core'

export default function ManageProposal(props) {
  return (
    <Container>
      <Typography>Manage Proposal</Typography>
      <Link to="/proposals/add">Create Proposal</Link>
    </Container>
  )
}
