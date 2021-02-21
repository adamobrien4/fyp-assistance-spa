import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import {
  Container,
  Typography,
  FormControl,
  Divider,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  Paper
} from '@material-ui/core'
import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import { Can } from '../../Auth/Can'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import BackButton from '../Buttons/BackButton'

import api from '../../utils/api.axios'

const formSchema = yup.object({
  responseType: yup
    .string()
    .oneOf(
      ['request_edits', 'accept', 'reject'],
      'Please select a response type'
    ),
  message: yup.string()
})

const defaultValues = {
  responseType: 'unselected',
  message: ''
}

const ViewProposal = props => {
  const [proposal, setProposal] = useState()
  const [loading, setLoading] = useState(true)
  const [submittingResponse, setSubmittingResponse] = useState(false)

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  const { id } = useParams()

  useEffect(() => {
    api
      .get(`/proposal/${id}`)
      .then(res => {
        console.log(res)

        setProposal(res.data.proposal)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onSubmit = data => {
    setSubmittingResponse(true)
    api
      .post(`/proposal/respond/${proposal._id}`, data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setSubmittingResponse(false)
      })
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  console.log(errors)

  return (
    <Container maxWidth="lg">
      <BackButton />
      <Typography>Proposal Details</Typography>
      <Input value={proposal.title} label="Title" variant="outlined" />
      <MultiLineInput label="Description" value={proposal.description} />

      <MultiLineInput
        label="Choose Me Message"
        value={proposal.chooseMessage}
      />

      <MultiLineInput
        label="Additional Notes"
        value={proposal.additionalNotes}
      />

      {proposal.type === 'studentDefined' ? (
        <>
          <MultiLineInput label="Environment" value={proposal.environment} />
          <MultiLineInput label="Languages" value={proposal.languages} />
        </>
      ) : null}

      {/* TODO: Implement Can to see if the user has permission to view these buttons (if they are a supervisor / coodinator)
       * Also ensure that this proposal has been sent to the supervisor's topic
       *
       */}

      <Divider />

      <Can I="manage" this="Proposal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={2} style={{ padding: '20px', marginTop: '10px' }}>
            <Typography align="center" component="h1" variant="h5">
              Proposal Response
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <FormControl
                  variant="outlined"
                  style={{ width: '100%' }}
                  error={!!errors.responseType}>
                  <Controller
                    render={({ onChange, value }) => (
                      <Select
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        style={{ marginTop: '16px' }}>
                        <MenuItem value="unselected" selected disabled>
                          Choose One
                        </MenuItem>
                        <MenuItem
                          value="request_edits"
                          style={{ color: 'orange' }}>
                          Request Edits
                        </MenuItem>
                        <MenuItem value="accept" style={{ color: 'green' }}>
                          Accept
                        </MenuItem>
                        <MenuItem value="reject" style={{ color: 'red' }}>
                          Reject
                        </MenuItem>
                      </Select>
                    )}
                    name="responseType"
                    control={control}
                  />
                </FormControl>
                <FormHelperText error={!!errors.responseType}>
                  {errors?.responseType?.message}
                </FormHelperText>
              </Grid>
              <Grid item xs={8}>
                <Input
                  inputRef={register}
                  name="message"
                  placeholder="Message to Student"
                  error={!!errors.abbr}
                  helperText={errors?.abbr?.message}
                />
              </Grid>
              <Grid item xs={2}>
                <PrimaryButton
                  style={{ height: '56px', marginTop: '16px' }}
                  disabled={submittingResponse}>
                  Submit
                </PrimaryButton>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Can>
    </Container>
  )
}

export default ViewProposal
