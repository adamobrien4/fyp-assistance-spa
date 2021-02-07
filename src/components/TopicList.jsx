import React, { useState, useEffect } from 'react'

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
  Box
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
  const [treeData, setTreeData] = useState([])
  const [error, setError] = useState('')
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [tagLoading, setTagLoading] = useState(true)
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

    api
      .get('/tag')
      .then(res => {
        console.log(res.data)
        setTreeData(res.data)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
      .finally(() => {
        setTagLoading(false)
      })
  }, [])

  const handleSearch = () => {
    console.log('Searching for tags ', tags)

    if (tags.length) {
      api
        .get('/topic/search', { tags: [...tags] })
        .then(res => {
          console.log(res)
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

      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          {/* <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              value={searchTerm}
              inputProps={{ 'aria-label': 'Search' }}
              onChange={e => {
                setSearchTerm(e.target.value)
              }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper> */}

          {tagLoading || loading ? (
            <Typography>Loading Tags ...</Typography>
          ) : (
            <Tags tags={tags} setTags={setTags} style={{ margin: '20px 0' }} />
          )}

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
          <ul>
            {topics.map(topic => {
              return (
                <Card key={topic._id}>
                  <CardContent>
                    <Typography variant="h6">{topic.title}</Typography>
                    <Typography variant="body1">Super McVisor</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {topic.tags.map(tag => {
                        return (
                          <Box
                            key={tag._id}
                            p={0.5}
                            m={0.25}
                            bgcolor="primary.main"
                            style={{
                              borderRadius: '5px',
                              textAlign: 'center'
                            }}>
                            {tag}
                          </Box>
                        )
                      })}
                    </Box>
                  </CardContent>
                </Card>
              )
            })}
          </ul>
        </>
      )}
    </Container>
  )
}