import React, { useState } from 'react'
import { useMsal } from '@azure/msal-react'

import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Avatar,
  ListItemIcon
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const ProfileMenu = props => {
  const { instance, accounts } = useMsal()
  const account = accounts[0]
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const accountAbbr = account.name.split(' ').map(el => el[0])

  const handleClickProfile = event => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleCloseProfile = () => {
    setProfileAnchorEl(null)
  }

  return (
    <Box edge="end">
      <Button
        disableRipple
        aria-label="delete"
        onClick={handleClickProfile}
        endIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
        <Avatar style={{ color: 'white' }}>{accountAbbr}</Avatar>
      </Button>

      <Menu
        anchorEl={profileAnchorEl}
        keepMounted
        open={Boolean(profileAnchorEl)}
        onClose={handleCloseProfile}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <MenuItem
          onClick={() => {
            instance.logout({
              onRedirectNavigate: process.env.REACT_APP_REDIRECT_URL
            })
            setProfileAnchorEl(null)
          }}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ProfileMenu
