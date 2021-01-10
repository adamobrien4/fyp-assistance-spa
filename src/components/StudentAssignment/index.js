import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../../config/msal-config';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, InputBase, Divider, Button, IconButton, List, ListItem, TextField, Checkbox, ListItemText, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import { Menu, Search, AddCircle as AddCircleIcon } from '@material-ui/icons';

import { useMsal } from "@azure/msal-react";
import { getAccessToken } from "../../msalHelpers";

import UploadButton from './UploadButton';
import SelectAllButton from './SelectAllButton';
import StudentListItem from './StudentListItem';
import CSVUploader from '../CSVUploader';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function StudentAssignment(props) {

	const classes = useStyles();

	const {accounts, instance} = useMsal();

	const [currentEmail, setCurrentEmail] = useState('');
	const [students, setStudents] = useState([]);
	const [checked, setChecked] = useState([]);
	const [includeEmailPrefix, setIncludeEmailPrefix] = useState(true);

	const handleToggle = (value) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	}

	const onChange = (e) => {
		setCurrentEmail(e.target.value);
	}

	const onAdd = (e) => {
		setCurrentEmail('');
		let prefix = includeEmailPrefix ? '@studentmail.ul.ie' : '';
		students.push(currentEmail + prefix);
	}

	const onAddBulk = (bulkStudents) => {
		let studentsList = [...students].concat(bulkStudents);
		setStudents(studentsList);
	}

	const onDelete = () => {
		let studentsList = students.filter( (student) => !checked.includes(student));
		setStudents(studentsList);
		setChecked([]);
	}

	const deleteStudent = (student) => {
		let studentsList = [...students];
		studentsList.splice(studentsList.indexOf(student), 1);
		setStudents(studentsList);
	}

	const onSelectAll = () => {
		if (checked.length === students.length) {
			setChecked([]);
		} else {
			setChecked(students);
		}
	}

	const onUpload = async (e) => {

		let body = {
			studentEmails: []
		}

		if (checked.length > 0) {
			console.log('Uploading these students: ' + checked);
			body.studentEmails = checked;
		} else {
			console.log('Uploading these students: ' + students);
			body.studentEmails = students;
		}

		let request = {
      authority:
      `${config.endpoints.login}/${config.auth.tenantId}`,
      scopes: config.auth.scopes.customApi,
      account: accounts[0]
    };

    let accessResponse = await getAccessToken(instance, request);

    var bearer = `Bearer ${accessResponse.accessToken}`;

    const options = {
      headers: {
        "Authorization": bearer
      }
		};
		
		setChecked([]);

		axios.post(`${config.endpoints.customApi}/students/assign`, body, options)
			.then(res => {
				if (res.data.length > 0) {
					for (let i = 0; i < res.data.length; i++) {
						let student = res.data[i];

						console.log(student);

						switch (student.status) {
							case 'not_found':
								alert(student.email + 'could not be found. Is the email address correct?');
								break;
							case 'already_assigned':
								deleteStudent(student.email);
								break;
							case 'assigned':
								deleteStudent(student.email);
								break;
							default:
								console.log('Unknown student status');
								console.log(student);
								break
						}
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	const onChangeEmailPrefix = (e) => {
		setIncludeEmailPrefix(e.target.checked);
	}

	const listStyle = {
		maxWidth: 360
	}

	const endAdornment = includeEmailPrefix ? <span style={{fontSize: '10px', color: 'gray', marginRight: 10}}>@studentmail.ul.ie</span> : '';

	return (
		<Container>
			<CSVUploader onAdd={onAddBulk} />
			<Paper component="form" className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder="Student Email"
					value={currentEmail}
					inputProps={{ 'aria-label': 'Student Email' }}
					endAdornment={endAdornment}
					onChange={onChange}
				/>
				<Tooltip title="Include @studentmail prefix" aria-label="Include @studentmail prefix">
					<Checkbox
						edge="start"
						disableRipple
						checked={includeEmailPrefix}
						onChange={onChangeEmailPrefix}
					/>
				</Tooltip>
				<Divider className={classes.divider} orientation="vertical" />
				<IconButton className={classes.iconButton} aria-label="search" onClick={onAdd}>
					<AddCircleIcon />
				</IconButton>
			</Paper>

			<br />

			<div>
				<SelectAllButton onSelectAll={onSelectAll} checkedCount={checked.length} studentCount={students.length} />
				<Button variant="outlined" color="secondary" startIcon={<DeleteSweepIcon />} onClick={onDelete}>Delete Selected ({checked.length})</Button>
				<List style={listStyle}>
				{students.map((student) => {
					return (
						<StudentListItem student={student} checked={checked} handleToggle={handleToggle} />
					);
				})}
				</List>
				<UploadButton checkedCount={checked.length} onUpload={onUpload}  />
			</div>
		</Container>
	);

}