import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Typography, Button } from '@material-ui/core'

const NotFound = () => (
  <Container maxWidth="md">
    <Typography align="center" variant="h3">
      The requested page could not be found
    </Typography>

    <br />

    <center>
      <Link to="/">
        <Button variant="contained" color="primary">
          Back to Homepage
        </Button>
      </Link>
    </center>
  </Container>
)

export default NotFound
