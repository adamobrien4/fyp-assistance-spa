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
    console.log(props)
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
    showSearch: true,
    disabled: props.disabled
  }

  if (loading) {
    return (
      <Typography varaint="body1" style={{ marginLeft: '5px' }}>
        Loading Tags List...
      </Typography>
    )
  }

  return <TreeSelect treeData={treeData} {...tProps} />
}

Tags.propTypes = {
  setTags: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default Tags
