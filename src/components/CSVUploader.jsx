import React from 'react'
import PropTypes from 'prop-types'
import { CSVReader } from 'react-papaparse'
import * as yup from 'yup'

import Button from '@material-ui/core/Button'

const buttonRef = React.createRef()

const papaParseConfig = {
  header: true
}

export default function CSVUploader(props) {
  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoaded = data => {
    console.log(data)

    let studentsArray = []
    for (let entry of data) {
      let email = entry.data.StudentEmail
      // Skip any entries which are null or empty
      if (!email || email === '') {
        console.log(email, 'is being skipped')
        continue
      }

      console.log(email)
      studentsArray.push(email)
    }

    props.onAdd(studentsArray)
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------')
    console.log(err)
    console.log('---------------------------')
  }

  const handleOnRemoveFile = data => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  return (
    <>
      <CSVReader
        config={papaParseConfig}
        ref={buttonRef}
        onFileLoad={handleOnFileLoaded}
        onError={handleOnError}
        noClick
        noDrag
        noProgressBar
        onRemoveFile={handleOnRemoveFile}>
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}>
            <Button
              onClick={handleOpenDialog}
              variant="contained"
              color="primary"
              style={{
                borderRadius: 0,
                marginTop: 5,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                height: 50,
                paddingLeft: 0,
                paddingRight: 0
              }}>
              Browse file
            </Button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}>
              {file && file.name}
            </div>
            <Button
              variant="contained"
              onClick={handleRemoveFile}
              style={{
                borderRadius: 0,
                marginTop: 5,
                marginLeft: 0,
                marginRight: 0,
                width: '10%',
                height: 50,
                paddingLeft: 0,
                paddingRight: 0
              }}>
              Remove
            </Button>
          </aside>
        )}
      </CSVReader>
    </>
  )
}

CSVUploader.propTypes = {
  onAdd: PropTypes.func.isRequired
}
