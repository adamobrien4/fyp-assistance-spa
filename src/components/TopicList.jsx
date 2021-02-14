import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  TableBody,
  TableCell,
  TableRow,
  Link as MuiLink,
  Avatar
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

export default function TopicList(props) {
  const classes = useStyles()

  const [tags, setTags] = useState([])
  const [error, setError] = useState('')
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [advancedSearch, setAdvancedSearch] = useState(false)

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
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSearch = () => {
    console.log('Searching for tags ', tags)

    if (tags.length) {
      api
        .post('/topic/search', { tags: [...tags] })
        .then(res => {
          console.log(res)

          setTopics(res.data.topics)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // No tags selected
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1">
        Topic List
      </Typography>

      <Tags value={tags} onChange={setTags} style={{ margin: '20px 0' }} />

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={advancedSearch}
            color="primary"
            name="advancedSearch"
            onChange={e => {
              setAdvancedSearch(e.target.checked)
            }}
          />
        }
        label="Advanced Search"
      />
      {/* <Collapse in={advancedSearch}>
            <Typography>Advanced Search Settings</Typography>
          </Collapse> */}
      <PrimaryButton onClick={handleSearch}>Search</PrimaryButton>

      <TableContainer component={Paper} style={{ margin: '20px 0' }}>
        <Table style={{ minWidth: '650px' }} size="medium">
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
