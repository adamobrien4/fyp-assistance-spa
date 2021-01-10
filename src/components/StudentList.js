import React, { Component } from 'react';

import { getUserProfileByEmail, assignRoleToUser } from '../msalHelpers';

class StudentList extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleConvert = this.handleConvert.bind(this);
		this.handleAssign = this.handleAssign.bind(this);

		this.state = {
			currentStudentEmail: '',
			students: [],
			instance: props.instance,
			account: props.account
		}
	}

	handleChange(e) {
		this.setState({
			currentStudentEmail: e.target.value
		});
	}

	handleAdd(e) {
		var email = this.state.currentStudentEmail;

		var student = {
			email: email,
			id: this.state.students.length
		}

		let newStudenList = this.state.students.concat(student);

		this.setState({
			students: newStudenList,
			currentStudentName: ''
		})
	}

	handleConvert(e) {
		let studentList = this.state.students;

		for (var student of studentList) {
			getUserProfileByEmail(this.state.instance, this.state.account, student.email);
		}
	}

	handleAssign(e) {
		let studentList = this.state.students;

		for (var student of studentList) {
			assignRoleToUser(this.state.instance, this.state.account, student.email, '170a8e98-463f-4f72-b783-963f05923afc');
		}
	}

	render() {
		return (
			<div>
				<ul>
					{this.state.students.map(student => (
						<li key={student.id}>{student.email}</li>
					))}
				</ul>
				<input type="text" placeholder="Student Email" value={this.state.currentStudentEmail} onChange={this.handleChange} />
				<input type="button" value="Add Student" onClick={this.handleAdd} />
				<input type="button" value="Convert to ID" onClick={this.handleConvert} />
				<input type="button" value="Clear List" onClick={() => this.setState({students: []})} />
				<input type="button" value="Assign as Student" onClick={this.handleAssign} />
			</div>
		)
	}
}

export default StudentList;