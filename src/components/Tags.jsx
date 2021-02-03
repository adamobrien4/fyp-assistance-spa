import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'

import { Typography } from '@material-ui/core'
import api from '../utils/api.axios'

const { SHOW_PARENT } = TreeSelect

const Tags = props => {
  const [treeData, setTreeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/tag')
      .then(res => {
        console.log(res)
        setTreeData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onTreeSelectChange = value => {
    console.log('onChange: ', value)
    props.setTags(value)
  }

  let tProps = {
    value: props.tags,
    onChange: onTreeSelectChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Search Topic Tags',
    style: {
      width: '100%'
    },
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

  console.log(treeData)

  return <TreeSelect treeData={treeData} {...tProps} />
}

Tags.propTypes = {
  setTags: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired
}

export default Tags
