import React from 'react'

import { Container, Typography } from '@material-ui/core'

const APIUnavailable = props => {
  return (
    <Container maxWidth="md">
      <center>
        <Typography>
          Unable to connect to API Service, please try refreshing the page.
        </Typography>
        <br />
        <Typography>
          If the issue persists, please ensure you have an internet connection.
        </Typography>
      </center>
    </Container>
  )
}

export default APIUnavailable
