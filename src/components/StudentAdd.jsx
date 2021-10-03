import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class StudentAdd extends Component {
	constructor(props) {
		super(props);
		this.backEmployee = this.backEmployee.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
		this.state = {
			fullName: '',
			address: '',
			rollNo: '',
			studentImage: '',
			dateOfBirth: new Date("05-10-1997"),
			errors:{}

		}
	}

	backEmployee() {
		this.props.history.push('/');
	}

	fullName = (event) => {
		this.setState({ fullName: event.target.value })
	}

	address = (event) => {
		this.setState({ address: event.target.value })
	}

	rollNo = (event) => {
		this.setState({ rollNo: event.target.value })
	}

	studentImage = (event) => {
		this.setState({ studentImage: event.target.files[0] })
	}

	DateOfBirth = (date) => {
		this.setState({ dateOfBirth: date })
	}

	formSubmit = async (event) => {
		const studentState = this.state;
		const errors = {}
		const error = Array();
		console.log(studentState);
		console.log(typeof (studentState.fullName));
		if (studentState.fullName == '') {
			errors.fullName = "Full Name Required"			
		}

		if (studentState.address == '') {		
			errors.address = "Address Required"
		}

		if (studentState.rollNo == '') {
			errors.rollNo = "Roll No Required"
		}

		if (studentState.dateOfBirth == '') {
			errors.dateOfBirth = "Date of Birth Required"
		}

		if (studentState.studentImage == '') {
			errors.studentImage = "Student Image Required"
		}

		this.setState({ errors });
		var count = Object.keys(errors).length;
		if(count > 0 ) {
			return false
		}	


		console.log(this.state.studentImage);
		//const inputData = { fullName: this.state.fullName, address: this.state.address, rollNo: this.state.rollNo };
		console.log(this.state.studentImage);
		const fd = new FormData();

		fd.append('studentImage', this.state.studentImage);
		fd.append('fullName', this.state.fullName);
		fd.append('address', this.state.address);
		fd.append('rollNo', this.state.rollNo);
		fd.append('dateOfBirth', this.state.dateOfBirth);
		console.log(fd);

		const res_data = await fetch(`${process.env.React_App_API_BASE_URL}api/student/add`, {
			method: 'POST',
			body: fd
		});
		this.props.history.push('/');
		console.log(res_data);
	}

	render() {
		return (
			<div>
				<h2 className="text-center">Add Student</h2>
				<div className="container">
					<div className="form-group col-md-6">
						<label htmlFor="email">Full Name : </label>
						<input type="text" value={this.state.fullName}
							className="form-control"
							placeholder="Enter Full Name"
							name="fullName"
							onChange={this.fullName} />
							<label>{this.state.errors.fullName}</label>
					</div>
					<div className="clearfix"></div>
					<div className="form-group col-md-6">
						<label htmlFor="Address">Address:</label>
						<textarea name="address" className="form-control" onChange={this.address} defaultValue={this.state.address}></textarea>
						<label>{this.state.errors.address}</label>
					</div>

					<div className="clearfix"></div>
					<div className="form-group col-md-6">
						<label htmlFor="rollNo">Roll No:</label>
						<input type="text" name="rollNo" className="form-control" onChange={this.rollNo} value={this.state.rollNo} />
						<label>{this.state.errors.rollNo}</label>
					</div>

					<div className="clearfix"></div>
					<div className="form-group col-md-3">
						<DatePicker selected={this.state.dateOfBirth}
							maxDate={new Date()}
							onChange={(date) => this.DateOfBirth(date)}
							dateFormat="dd-MM-yyyy"
							className="form-control" />
						<label>{this.state.errors.dateOfBirth}</label>	
					</div>

					<div className="clearfix"></div>
					<div className="form-group col-md-6">
						<label htmlFor="studentImage">Student Image:</label>
						<input type="file" name="studentImage" onChange={this.studentImage} />
						<label>{this.state.errors.studentImage}</label>
					</div>
					<div className="clearfix"></div>
					<div className="checkbox col-md-6">
						<button type="submit" className="btn btn-primary" onClick={this.formSubmit}>Submit</button>
						<button type="submit" className="btn btn-danger mg-left-10" onClick={this.backEmployee}>Back</button>
					</div>


				</div>

			</div>
		)
	}
}
export default StudentAdd;