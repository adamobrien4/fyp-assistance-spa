import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {
  Container,
  InputBase,
  Paper,
  Divider,
  IconButton,
  Typography,
  Card,
  CardContent,
  Collapse,
  Checkbox,
  FormControlLabel,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Link as MuiLink,
  Avatar,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles'

import api from '../utils/api.axios'
import Tags from './Tags'
import PrimaryButton from './PrimaryButton'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

const defaultValues = {
  tags: [],
  supervisor: 'unspecified'
}

export default function TopicList(props) {
  const classes = useStyles()

  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [supervisors, setSupervisors] = useState([])

  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    defaultValues
  })

  useEffect(() => {
    api
      .get('/topic')
      .then(res => {
        console.log(res)
        if (res.data?.topics) {
          setTopics(res.data.topics)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })

    api
      .get('/supervisor/list')
      .then(res => {
        console.log(res)

        setSupervisors(res.data.supervisors)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {})
  }, [])

  const handleSearch = data => {
    console.log(data)

    let query = { tags: null, supervisor: null }

    if (data.tags.length > 0) {
      query.tags = [...data.tags]
    }

    if (data.supervisor !== 'unspecified') {
      query.supervisor = data.supervisor
    }

    console.log('Querying DB for', query)

    api
      .post('/topic/search', query)
      .then(res => {
        console.log(res)

        setTopics(res.data.topics)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1">
        Topic List
      </Typography>

      <form onSubmit={handleSubmit(handleSearch)}>
        <Controller
          control={control}
          name="tags"
          render={({ onChange, value }) => (
            <Tags
              value={value}
              onChange={vals => {
                onChange(vals)
              }}
              error={!!errors?.tags}
              helperText={errors?.tags?.message}
            />
          )}
        />

        <FormControl variant="outlined">
          <Controller
            render={({ onChange, value }) => (
              <Select value={value} onChange={onChange}>
                <MenuItem value="unspecified" key="unspecified" selected>
                  None
                </MenuItem>
                {supervisors.map(supervisor => (
                  <MenuItem value={supervisor._id}>
                    {supervisor.displayName}
                  </MenuItem>
                ))}
              </Select>
            )}
            name="supervisor"
            control={control}
          />
        </FormControl>

        <PrimaryButton>Search</PrimaryButton>
      </form>

      <TableContainer component={Paper} style={{ margin: '20px 0' }}>
        <Table style={{ minWidth: '650px' }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                {`Found ${topics.length} matching topics`}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topics.length === 0 ? (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={3}>
                  <Typography>
                    {loading ? 'Loading Topics ...' : 'No Topics to display'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              topics.map(topic => (
                <TableRow key={topic.code}>
                  <TableCell component="th" scope="row">
                    <Link to={'./topics/view/' + topic.code}>
                      <MuiLink component="p">{topic.title}</MuiLink>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {topic.supervisor.displayName} - {topic.supervisor.abbr}
                  </TableCell>
                  <TableCell align="center">{topic.code}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'right'
                      }}>
                      {topic.tags.slice(0, 3).map(tag => (
                        <Box
                          key={tag}
                          style={{
                            backgroundColor: '#dbdbdb',
                            color: '#5b5b5b',
                            margin: '0 3px',
                            padding: '4px',
                            borderRadius: '3px'
                          }}>
                          {tag}
                        </Box>
                      ))}
                      {topic.tags.length > 3 ? (
                        <Box
                          key={'additional_tags'}
                          style={{
                            backgroundColor: '#dbdbdb',
                            color: '#5b5b5b',
                            margin: '0 3px',
                            padding: '4px',
                            borderRadius: '3px'
                          }}>
                          {'+ ' + (topic.tags.length - 3) + ' more'}
                        </Box>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    7 Students have shown interest
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
