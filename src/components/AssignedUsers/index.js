import React from 'react'
import { DataGrid } from '@material-ui/data-grid'

export default function AssignedUsers(props) {
  const rows = [
    {
      id: 0,
      email: 'Adam@gmail.com',
      displayName: 'Adam'
    }
  ]

  const columns = [
    { field: 'email', headerName: 'Email', width: 300, flex: 1 },
    { field: 'displayName', headerName: 'Display Name', width: 300, flex: 1 }
  ]

  return (
    <div>
      <h4>Existing Students</h4>
      <div style={{ width: '100%', height: '400px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </div>
  )
}
