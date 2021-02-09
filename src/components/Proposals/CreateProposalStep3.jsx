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

import Input from '../Input'
import MultiLineInput from '../MultiLineInput'
import PrimaryButton from '../PrimaryButton'
import Breadcrumb from './Breadcrumb'

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch)

const CreateProposal = props => {
  // CreateProposal Context
  const { setContextValues, data } = useData()

  const [environment, setEnvironment] = useState(data?.environment || '')
  const [languages, setLanguages] = useState(data?.languages || '')

  const history = useHistory()

  const handleOnEnvironmentChange = e => {
    setEnvironment(e.target.value)
  }

  const handleOnLanguagesChange = e => {
    setLanguages(e.target.value)
  }

  const handleNextStep = () => {
    // Get data from form and store in context

    let formData = {
      ...data,
      environment: environment,
      languages: languages
    }

    if (data?.step === 2) {
      formData.step = 3
    }

    history.push('./finish')
    setContextValues(formData)
  }

  return (
    <Container component="main" maxWidth="md">
      <Breadcrumb />
      <Typography>Create Proposal - Step 3</Typography>

      <MultiLineInput
        label="Environment Required"
        onChange={handleOnEnvironmentChange}
        value={environment}
      />
      <MultiLineInput
        label="Languages / Technologies Required"
        onChange={handleOnLanguagesChange}
        value={languages}
      />

      <PrimaryButton
        disabled={!environment || !languages}
        onClick={handleNextStep}>
        Save and Continue
      </PrimaryButton>
    </Container>
  )
}

CreateProposal.propTypes = {
  selectedTopic: PropTypes.string
}

export default CreateProposal
