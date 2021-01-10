import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/AutoComplete';

import Tags from './Tags';

export default function Suggestion(props) {

	const [targetCourses, setTargetCourses] = useState([]);

	const handleKeyDown = event => {
    switch (event.key) {
      case ",":
      case " ": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          setTargetCourses([...targetCourses, event.target.value]);
        }
        break;
      }
      default:
    }
	};
	
	const onAutocompleteChange = (e, newValue) => {
		setTargetCourses(newValue);
	}

  return (
		<Container component="main" maxWidth="xs">
			<form autoComplete="off">
				<TextField
					required
					label="Title"
					fullWidth
				/>
				<TextField
					required
					label="Description"
					multiline
					rows={2}
					maxRows={6}
					fullWidth
				/>
				<TextField
					label="Requirements (optional)"
					multiline
					rows={2}
					maxRows={6}
					fullWidth
				/>
				<Tags data={null} />
				<TextField
					label="Desired Skills (optional)"
					multiline
					rows={2}
					maxRows={6}
					fullWidth
				/>

				<span>Target Courses</span>
				<Autocomplete
					multiple
					freeSolo
					options={courses}
					getOptionLabel={option => option.code + " " + option.title}
					value={targetCourses}
					onChange={onAutocompleteChange}
					filterSelectedOptions
					renderInput={params => {
						params.inputProps.onKeyDown = handleKeyDown;
						return (
							<TextField
								{...params}
								variant="outlined"
								label="Select Targeted Courses"
								placeholder="Courses"
								margin="normal"
								fullWidth
							/>
						);
					}}
				/>
			</form>
		</Container>
	)
}

const courses = [
	{ code: "LM051", title: "Computer Systems" },
	{ code: "LM052", title: "Course 2" },
	{ code: "Lm053", title: "Course 3" }
]