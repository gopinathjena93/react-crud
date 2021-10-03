import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class StudentEdit extends Component {
   constructor(props) {

      super(props);
      this.backEmployee = this.backEmployee.bind(this)
      this.formSubmit = this.formSubmit.bind(this)
      this.studentImage = this.studentImage.bind(this)

      this.state = {
         selectedId: this.props.match.params.id,
         fullName: '',
         address: '',
         rollNo: '',
         studentImage: '',
         student_image: '',
         dateOfBirth: new Date("05-10-1997")
      }
   }

   backEmployee() {
      this.props.history.push('/');
   }

   fullName = (event) => {
      this.setState({ fullName: event.target.value })
   }

   addressHandler = (event) => {
      this.setState({ address: event.target.value })
   }

   rollNo = (event) => {
      this.setState({ rollNo: event.target.value })
   }

   studentImage = (event) => {
      this.setState({ studentImage: event.target.files[0] })
   }



   async componentDidMount() {
      const res_data = await fetch(`${process.env.React_App_API_BASE_URL}api/student/single`, {
         method: "POST",
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ id: this.state.selectedId })
      });
      const res_data1 = await res_data.json();

      console.log(res_data1.address);

      this.setState({
         fullName: res_data1.name,
         address: res_data1.address,
         rollNo: res_data1.roll_no,
         dateOfBirth: new Date(res_data1.date_of_birth),
         student_image: res_data1.student_image
      })
      //this.setState({ students: res_data1 })	
   }

   formSubmit = async (event) => {
      //const inputData = { fullName: this.state.fullName, address: this.state.address, rollNo: this.state.rollNo,id:this.state.selectedId };
      const fd = new FormData();
      fd.append('studentImage', this.state.studentImage);
      fd.append('fullName', this.state.fullName);
      fd.append('address', this.state.address);
      fd.append('rollNo', this.state.rollNo);
      fd.append('id', this.state.selectedId);
      const res_data = await fetch(`${process.env.React_App_API_BASE_URL}api/student/update`, {
         method: 'POST',
         body: fd
      });
      this.props.history.push('/');
      console.log(res_data);
   }

   render() {
      return (
         <div>
            <h2 className="text-center">Edit Student</h2>

            <div className="container">


               <div className="form-group col-md-6">
                  <label htmlfor="email">Full Name : </label>
                  <input type="text" value={this.state.fullName}
                     className="form-control"
                     placeholder="Enter Full Name"
                     name="fullName"
                     onChange={this.fullName} />
               </div>
               <div className="clearfix"></div>
               <div className="form-group col-md-6">
                  <label htmlfor="Address">Address:</label>
                  <textarea name="address" className="form-control" onChange={this.addressHandler} defaultValue={this.state.address}></textarea>

               </div>
               <div className="clearfix"></div>
               <div className="form-group col-md-6">
                  <label htmlFor="rollNo">Roll No:</label>
                  <input type="text" name="rollNo" className="form-control" onChange={this.rollNo} value={this.state.rollNo} />
               </div>

               <div className="clearfix"></div>
               <div className="form-group col-md-3">
                  <DatePicker selected={this.state.dateOfBirth}
                     maxDate={new Date()}
                     onChange={(date) => this.DateOfBirth(date)}
                     dateFormat="dd-MM-yyyy"
                     className="form-control" />
               </div>

               <div className="clearfix"></div>
               <div className="form-group col-md-6">
                  <label htmlFor="studentImage">Student Image:</label>
                  <input type="file" name="studentImage" onChange={this.studentImage} />
                  <img className="image-preview mg-top-10" src={this.state.student_image} />
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
export default StudentEdit;