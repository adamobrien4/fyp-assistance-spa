import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Note :
 * If you're using react v 15.4 or less
 * You can directly import PropTypes from react instead.
 * Refer to this : https://reactjs.org/warnings/dont-call-proptypes.html
 */

const useStyles = makeStyles(theme => ({
  countdown: {
    margin: '10px auto',
    paddingBottom: '20px',
    textAlign: 'center'
  },

  countdownCol: {
    display: 'inline-block'
  },

  countdownColElement: {
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    '& strong': {
      fontSize: '50px'
    }
  }
}))

const Countdown = props => {
  const [timeLeft, setTimeLeft] = useState({
    days: ' - ',
    hours: ' - ',
    min: ' - ',
    sec: ' - '
  })
  const [interval, updateInterval] = useState()

  const classes = useStyles()

  useEffect(() => {
    // update every second
    updateInterval(
      setInterval(() => {
        const date = calculateCountdown(props.date)
        date ? setTimeLeft(date) : stop()
      }, 1000)
    )
  }, [])

  const calculateCountdown = endDate => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000

    // clear countdown when date is reached
    if (diff <= 0) return false

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    }

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  const stop = () => {
    clearInterval(interval)
  }

  const addLeadingZeros = value => {
    value = String(value)
    while (value.length < 2) {
      value = '0' + value
    }
    return value
  }

  return (
    <div className={classes.countdown}>
      <span className={classes.countdownCol}>
        <span className={classes.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.days)}</strong>
          <span>{timeLeft.days === 1 ? 'Day' : 'Days'}</span>
        </span>
      </span>

      <span className={classes.countdownCol}>
        <span className={classes.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.hours)}</strong>
          <span>Hours</span>
        </span>
      </span>

      <span className={classes.countdownCol}>
        <span className={classes.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.min)}</strong>
          <span>Min</span>
        </span>
      </span>

      <span className={classes.countdownCol}>
        <span className={classes.countdownColElement}>
          <strong>{addLeadingZeros(timeLeft.sec)}</strong>
          <span>Sec</span>
        </span>
      </span>
    </div>
  )
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
}

Countdown.defaultProps = {
  date: new Date()
}

export default Countdown
