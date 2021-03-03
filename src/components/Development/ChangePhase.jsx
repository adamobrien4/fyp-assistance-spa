import React, { useContext } from 'react'
import { PhaseContext } from '../../contexts/PhaseContext'
import Phase from '../../Auth/Phase'

import { FormControl, Select, MenuItem } from '@material-ui/core'

const ChangePhase = props => {
  const { setCurrentPhase, currentPhase } = useContext(PhaseContext)

  return (
    <FormControl>
      <Select
        value={currentPhase.phase}
        onChange={e => {
          setCurrentPhase(
            new Phase({
              phase: e.target.value,
              startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
              endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
            })
          )
        }}>
        <MenuItem value={0}>Zero</MenuItem>
        <MenuItem value={1}>One</MenuItem>
        <MenuItem value={2}>Two</MenuItem>
        <MenuItem value={3}>Three</MenuItem>
        <MenuItem value={4}>Four</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ChangePhase
