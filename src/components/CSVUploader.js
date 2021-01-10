import React from 'react';
import { CSVReader } from 'react-papaparse';

export default function CSVUploader(props) {

	const handleOnFileLoad = (data) => {
		console.log(data);

		let studentsArray = [];
		for (let entry of data) {
			console.log(entry.data.StudentEmail);
			studentsArray.push(entry.data.StudentEmail);
		}

		props.onAdd(studentsArray);
	}
	
	const handleOnError = (err, file, inputElem, reason) => {
		console.log(err, file, inputElem, reason);
	}
	
	const handleOnRemoveFile = (data) => {
		console.log(data);
	}
	
	const papaParseConfig = {
		header: true,
		preview: 2
	}

	return (
		<div>
			<h5>Click or Drop to Upload</h5>
			<CSVReader
				config={papaParseConfig}
				onFileLoad={handleOnFileLoad}
				onError={handleOnError}
				addRemoveButton
				onRemoveFile={handleOnRemoveFile}
				noProgressBar
			>
				<span>Drop CSV file here or click to upload.</span>
			</CSVReader>
		</div>
	)

}