import React, { Component } from "react";
import Swal from "sweetalert2";
import Moment from 'moment';

class StudentManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			limit: 5,
			page: 1,
			totalRecord: null,
			students: []
		}
		this.addStudent = this.addStudent.bind(this);
		this.editStudent = this.editStudent.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.fetchPagination = this.fetchPagination.bind(this);
		this.paginationNext = this.paginationNext.bind(this);
		this.paginationPrevious = this.paginationPrevious.bind(this);
		this.limitChange = this.limitChange.bind(this);
	}

	limitChange = (event) => {
		const currentLimit = Number(event.target.value);			
		const currentPage = 1;			
		this.setState({ limit: currentLimit })
		this.setState({ page: currentPage })
		this.fetchAllStudent(currentPage,currentLimit);
	}

	paginationNext = (event) => {
		const currentPage = Number(this.state.page + 1);
		console.log(currentPage)
		if (Math.ceil(this.state.totalRecord/this.state.limit) < currentPage) return false
		this.setState({ page: currentPage })
		this.fetchAllStudent(currentPage,this.state.limit);
	}

	paginationPrevious = (event) => {
		const currentPage = Number(this.state.page - 1);
		if (currentPage < 1) return false
		console.log(currentPage)
		this.setState({ page: currentPage })
		this.fetchAllStudent(currentPage,this.state.limit);
	}

	fetchPagination = (event) => {
		const currentPage = Number(event.target.id);
		this.setState({ page: currentPage })
		this.fetchAllStudent(currentPage,this.state.limit);
	}

	addStudent() {
		this.props.history.push('/student/add');
	}

	editStudent(id) {
		console.log(`id :::: ${id}`)
		this.props.history.push(`/student/edit/${id}`);
	}

	async deleteStudent(id) {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				this.DeleteApi(id);
			  	Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
			  )
			}
		})		
	}

	async DeleteApi(id) {
		const res_data = await fetch(`${process.env.React_App_API_BASE_URL}api/student/delete/${id}`)
		const res_data1 = await res_data.json();		
		this.props.history.push('/');
		this.fetchAllStudent(this.state.page,this.state.limit);
	}

	async fetchAllStudent(pageNumber,pageLimit) {
		//console.log(process.env.React_App_API_BASE_URL);
		const res_data = await fetch(`${process.env.React_App_API_BASE_URL}api/student/manage?page=${pageNumber}&limit=${pageLimit}`);
		const res_data1 = await res_data.json();
		//console.log(res_data1.totalStudent);
		this.setState({ totalRecord: res_data1.totalStudent });
		this.setState({ students: res_data1.allStudent })
	}

	componentDidMount() {
		this.fetchAllStudent(this.state.page,this.state.limit);
	}

	render() {	
		const { limit, page, students, totalRecord } = this.state;
		const pageNumbers = [];		
		for (let i = 1; i <= Math.ceil(totalRecord / limit); i++) {
			pageNumbers.push(i);
		}
		const renderPageNumbers = pageNumbers.map(number => {
			const activeClass = (this.state.page == number) ? "page-item active" : "page-item";
			return (
				<li className={activeClass}
					key={number}
					onClick={this.fetchPagination}>
					<a id={number} className="page-link" href="#" >{number}</a>
				</li>
			);
		});

		const perPages = [1,5,10,20,50,100];
		const renderPerPage = perPages.map(number => {
			const activeClass = (this.state.limit == number) ? "selected" : "";
			return (
				<option defaultValue={number} selected={activeClass} >{number}</option>				
			);
		});

		return (
			<div>
				<h2 className="text-center">Student List</h2>

				<div className="container">
					<div class="col-md-2">
						<button className="btn btn-primary" style={{ marginBottom: "10px" }} onClick={this.addStudent} >Add Student</button>
					</div>
					<div className="col-md-1 col-md-offset-7"><label>Per Page</label></div>
					<div className="col-md-2">						
						<select className="form-control" onChange={this.limitChange}>
							{renderPerPage}
						</select>
					</div>
					<table className="table table-bordered">
						<thead>
							<tr className="gradient-color">
								<th>SL No</th>
								<th>Full Name</th>
								<th>Address</th>
								<th>Roll No</th>
								<th>Date of Birth</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.students.map((student, count) =>
									<tr key={student._id}>
										<td>{(this.state.limit * (this.state.page - 1)) + count + 1}</td>
										<td>{student.name}</td>
										<td>{student.address}</td>
										<td>{student.roll_no}</td>
										<td>{Moment(student.date_of_birth).format('DD-MMM-YYYY','en')} </td>
										<td>
											<button className="btn btn-warning" onClick={() => this.editStudent(student._id)}>Edit</button>
											<button className="btn btn-danger  mg-left-10" onClick={() => this.deleteStudent(student._id)}>Delete</button>
										</td>
									</tr>
								)}
						</tbody>
					</table>
					<nav style={{ float: "right" }} >
						<ul className="pagination">
							<li className="page-item">
								<a className="page-link" href="#" onClick={this.paginationPrevious}>Previous</a>
							</li>
							{renderPageNumbers}
							<li className="page-item">
								<a className="page-link " href="#" onClick={this.paginationNext}>Next</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}
export default StudentManage;