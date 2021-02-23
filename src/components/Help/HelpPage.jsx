import React from 'react'
import { Typography as T, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: '28px'
  },
  paragraph: {
    fontSize: '16px'
  }
}))

export default function HelpPage() {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <T className={classes.heading}>What are Topics?</T>
      <T className={classes.paragraph}>
        A topic is a FYP project idea which is supplied by a Supervisor.
      </T>
      <T className={classes.heading}>What are Proposals?</T>
      <T className={classes.paragraph}>
        A proposal is a students intrepretation of a topic, proposals can be
        both supervisor defined (The Supervisor has thought of the idea) or
        student defined (The Student has thought of the idea). Student defined
        proposals can only be sent to supervisors who have made themselves
        available to supervise these types of project ideas.
      </T>
      <T className={classes.heading}>What are Phases?</T>
      <T className={classes.paragraph}>
        Phases are used to allow specific actions to be carried out during
        different time ranges.
      </T>
    </Container>
  )
}
