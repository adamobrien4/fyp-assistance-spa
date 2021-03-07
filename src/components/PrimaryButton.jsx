import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const PrimaryButton = ({ children, loading, ...props }) => {
  const styles = useStyles()

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={styles.root}
      disabled={loading}
      {...props}>
      {loading && <CircularProgress size={14} />}
      {!loading && children}
    </Button>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool
}

PrimaryButton.defaultProps = {
  loading: false
}

export default PrimaryButton
