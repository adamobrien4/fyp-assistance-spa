import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import 'antd/dist/antd.css'

import { Typography, FormHelperText } from '@material-ui/core'
import api from '../utils/api.axios'

const { SHOW_PARENT } = TreeSelect

const Tags = props => {
  const [treeData, setTreeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/tag')
      .then(res => {
        setTreeData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  let tProps = {
    value: props.value,
    onChange: props.onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Search Topic Tags',
    bordered: true,
    showSearch: true
  }

  if (loading) {
    return (
      <Typography varaint="body1" style={{ marginLeft: '5px' }}>
        Loading Tags List...
      </Typography>
    )
  }

  let style = {
    margin: '10px 0'
  }

  // TODO: Clean up how the tags are highlighted for errors

  if (props.error) {
    style.border = 'solid 1px red'
    style.borderRadius = '5px'
  }

  return (
    <div style={style}>
      <TreeSelect {...tProps} treeData={treeData} style={{ width: '100%' }} />
      {props.error && (
        <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
      )}
    </div>
  )
}

Tags.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string
}

export default Tags
