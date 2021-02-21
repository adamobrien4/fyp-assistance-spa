import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Typography } from '@material-ui/core'

const NotFound = () => (
  <Container maxWidth="md">
    <Typography align="center" variant="h3">
      The requested page could not be found
    </Typography>
    <Typography align="center" variant="h1">
      {':('}
    </Typography>

    <Link to="/" button>
      Back to Homepage
    </Link>
  </Container>
)

export default NotFound
