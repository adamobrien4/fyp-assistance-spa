import React, { useState } from 'react'

import TreeModel from 'tree-model'

import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
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

const tree = new TreeModel().parse({
  id: 'root',
  children: [
    {
      id: 'Neural Networks',
      children: [
        {
          id: 'CNN : Convolutional Neural Networks'
        },
        {
          id: 'ANN : Artificial Neural Network'
        },
        {
          id: 'RNN : Recurrent Neural Networks'
        }
      ]
    },
    {
      id: 'A1',
      children: [
        {
          id: 'B1',
          children: [
            {
              id: 'C1'
            },
            {
              id: 'C2'
            }
          ]
        }
      ]
    },
    {
      id: 'A2',
      children: [
        {
          id: 'B3'
        }
      ]
    }
  ]
})

export default function Tags(props) {
  const classes = useStyles()

  const [searchTerm, setSearchTerm] = useState('')
  const [tags, setTags] = useState([])
  const [resultTags, setResultTags] = useState([])

  const onInput = e => {
    setSearchTerm(e.target.value.trim(0))
  }

  const onSearch = () => {
    let results = []
    // Walk the tags tree to find any nodes which match the searchTerm
    tree.walk(node => {
      // Check if the searchTerm is present in the current node's id
      // TODO: Consider adding an "additional" field which will allow for other search criteria, intead of just using the node's id
      // e.g. id: 'CNN', additional: 'Convolutional Neural Network CNN Perceptron ...'
      if (node.model.id.indexOf(searchTerm) > -1) {
        if (node.model.id === 'root') return
        // TODO: Check if this tag has already been added to the tags array
        // Get all parent nodes of the current node
        let nodePath = node.getPath()
        // Add the 2nd last node from the current nodes path (it's parent node)
        // TODO: Remove unnecessary fields from these parent nodes before adding them to results
        let parents = []
        nodePath.splice(1, nodePath.length - 2).map(parent => {
          return parents.push(parent.model.id)
        })
        results.push({ self: node.model.id, parents: parents })
      }
    })

    if (results.length) {
      setResultTags(results)
      console.log('Results: ', results)
    } else {
      console.log(`No results found for searchTerm: ${searchTerm}`)
    }
  }

  const onTagSelect = tag => {
    for (let curTag of tags) {
      if (curTag.self === tag.self) {
        alert('Tag already added')
        return
      }
    }

    let tagList = [...tags].concat(tag)
    setTags(tagList)

    let resultTagList = [...resultTags].filter(curTag => curTag !== tag)
    setResultTags(resultTagList)
  }

  return (
    <div>
      <ul>
        {tags.map(tag => (
          <li key={tag.self}>
            {tag.parents.join(' >> ')} {'>>'} {tag.self}
          </li>
        ))}
      </ul>

      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'Search' }}
          value={searchTerm}
          onInput={onInput}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {resultTags.map(tag => (
        <div key={tag.self}>
          <span style={{ color: 'gray', fontSize: '12px' }}>
            {tag.parents.join(' >> ')}
          </span>
          <br />
          <Button variant="outlined" onClick={() => onTagSelect(tag)}>
            {tag.self}
          </Button>
        </div>
      ))}
    </div>
  )
}
