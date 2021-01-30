import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useData } from '../../contexts/CreateProposalContext'
import { useHistory } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Container,
  Grid,
  Switch,
  TableContainer,
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import api from '../../utils/api.axios'
import * as yup from 'yup'

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'

const customProposalSchema = yup.object().shape({
  title: yup.string().required('Proposal must have a title'),
  description: yup.string().required('Proposal must have a description'),
  notes: yup.string(),
  environment: yup.string().required('Proposal must have environment provided'),
  languages: yup
    .string()
    .required('Proposal must have languages/technologies provided')
})

const providedProposalSchema = yup.object().shape({
  topic: yup.object().shape({
    _id: yup.string().required('Topic must have an _id')
  }),
  title: yup.string().required('Proposal must have a title'),
  description: yup.string().required('Proposal must have a description'),
  notes: yup.string()
})

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextValues, data } = useData()

  useEffect(() => {}, [])

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      isCustomProposal: data.isCustomProposal,
      title: data.title,
      description: data.description,
      additionalNotes: data.additionalNotes
    }

    if (data.isCustomProposal) {
      let prevData = { ...formData }
      formData = {
        ...prevData,
        environment: data.environment,
        languages: data.languages
      }
    } else {
      let prevData = { ...formData }
      formData = {
        ...prevData,
        topic: data.topic._id
      }
    }

    console.log('Submitting ', formData)

    api
      .post('/proposal/add', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Finish (Review)</Typography>
      <code>{JSON.stringify(data)}</code>

      <Typography>
        {data.isCustomProposal
          ? 'Custom Proposal'
          : 'Supervisor Defined Proposal'}
      </Typography>

      {data.isCustomProposal ? null : (
        <>
          <Typography>{data.topic.title}</Typography>
          <Typography>{data.topic.supervisor?.displayName}</Typography>
        </>
      )}

      <Typography>{data.title}</Typography>
      <Typography>{data.description}</Typography>
      <Typography>{data.additionalNotes}</Typography>

      {data.isCustomProposal ? (
        <>
          <Typography>{data.environment}</Typography>
          <Typography>{data.languages}</Typography>
        </>
      ) : null}

      <PrimaryButton onClick={handleNextStep}>Submit Proposal</PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
