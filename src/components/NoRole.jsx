import React from 'react'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Container,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core'

import Input from './Input'

const formSchema = yup.object({
  email: yup.string().email().required(),
  accountType: yup.string().required()
})

const NoRole = props => {
  const defaultValues = {
    email: 'studentEmail',
    type: 'student'
  }

  /*const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues
  })

  const onSubmit = data => {
    console.log(data)
  }*/

  return (
    <Container maxWidth="lg">
      <Typography align="center" style={{ marginTop: '25px' }}>
        You have not been allowed access to this system.
      </Typography>

      {/* TODO: Add request access form */}

      {/* <Typography align="center">
        If you want to request access to the system, please fill out the form
        below.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          name="email"
          label="Email"
          variant="outlined"
          margin="none"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControl variant="outlined">
          <Controller
            render={({ onChange, value }) => (
              <Select value={value} onChange={onChange}>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="supervisor">Supervisor</MenuItem>
              </Select>
            )}
            name="status"
            control={control}
            error={!!errors.status}
            helperText={errors?.status?.message}
          />
        </FormControl>
      </form>

      <Button type="submit">Request Access</Button> */}
    </Container>
  )
}

export default NoRole
