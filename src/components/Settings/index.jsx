import React, { useState, useEffect } from 'react'
import * as yup from 'yup'

import {
  Container,
  Paper,
  Typography,
  Switch,
  Grid,
  Tooltip,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../utils/api.axios'

import PrimaryButton from '../PrimaryButton'

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(2)
  },
  gridItem: {
    padding: theme.spacing(1)
  },
  gridItemLabel: {
    textAlign: 'right',
    lineHeight: theme.spacing(0.25)
  },
  gridItemContent: {}
}))

const formSchema = yup.object({
  superviseStudentTopics: yup.boolean(),
  abbr: yup.string().required()
})

const defaultValues = {
  superviseStudentTopics: false,
  abbr: ''
}

export default function Test(props) {
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [supervisor, setSupervisor] = useState()

  const { reset, handleSubmit, control, register, errors } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  useEffect(() => {
    api
      .get('/supervisor/me')
      .then(res => {
        console.log(res)
        setSupervisor(res.data.supervisor)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (supervisor) {
      reset({
        superviseStudentTopics: supervisor.superviseStudentTopics,
        abbr: supervisor.abbr
      })
    }
  }, [supervisor])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const onSubmit = async data => {
    console.log(data)

    setUpdating(true)

    api
      .post('/supervisor/me/edit', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setUpdating(false)
      })
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <Container maxWidth="lg" component={Paper}>
      <Typography>Supervisor Settings</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.grid}>
          <Grid
            item
            xs={4}
            className={[classes.gridItem, classes.gridItemLabel]}>
            <Tooltip title="Supervise student defined proposals">
              <Typography>Supervise Student Proposals</Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={8} className={classes.gridItem}>
            <Controller
              name="superviseStudentTopics"
              control={control}
              render={({ onChange, value }) => (
                <Switch
                  onChange={e => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={4}
            className={[classes.gridItem, classes.gridItemLabel]}>
            <Typography>Supervisor Abbreviation</Typography>
          </Grid>
          <Grid item xs={8} className={classes.gridItem}>
            <TextField
              fullWidth
              size="small"
              inputRef={register}
              type="text"
              name="abbr"
              placeholder="Supervisor Abbreviation (John Ryan -> JRyn)"
              error={!!errors.abbr}
              helperText={errors?.abbr?.message}
            />
          </Grid>
        </Grid>

        <PrimaryButton loading={updating}>Save Changes</PrimaryButton>
      </form>
    </Container>
  )
}
