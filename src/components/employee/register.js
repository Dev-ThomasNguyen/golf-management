import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from "../../helpers/jwt_decode";

class EmployeeRegister extends Component {
	state = {
		firstname : "",
		lastname : "", 
		phone : "",
		email : "",
		password : "",
		experience : "",
		datestarted : "",
    course_id : "",
    error: "",
    message: "",
    course: []
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

   componentDidMount = async () => {
     const user = getUser();
     if (user && user.user) {
       this.props.history.replace('/');
    }
    const url = "http://localhost:3000/yourcourse/all";
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();
      this.setState({
        course: data
      })
    } catch(err) {
      console.log(err)
    }
  }

	// prettier-ignore
  handleSubmit = async (e) => {
    e.preventDefault();
		const url = "http://localhost:3000/employee/register";
		const formData = this.state;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
	   	});
      const data = await response.json()
      if (data.status === 'success') {
        localStorage.setItem('token', data.token)
        window.location.replace("/"); 
      }
      if (data.status === 'error') {
            this.setState({
              error: true,
              message: data.message
            })
        }
     } catch(err) {
        this.setState({
          error: true,
          message: err.message
        })
    }
	  };

	  render() {
      const course = this.state.course.map((co) => {
        return (
          <option value={co.id} key={co.id}>{co.clubname}</option>
        )
      })
    const error = this.state.message
      return (
        <div className="signupcontainer">
          <form onSubmit={this.handleSubmit}>
            <p className="error"> { error } </p>
            <div>
              <label>First Name</label>
              <input type="text" value={this.state.firstname} placeholder="Enter your firstname" id="firstname" onChange={this.handleChange} required/>
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" value={this.state.lastname} placeholder="Enter your lastname" id="lastname" onChange={this.handleChange} required/>
            </div>
            <div>
              <label>Phone</label>
              <input type="number" value={this.state.phone} placeholder="Enter your phone number" id="phone" onChange={this.handleChange} required/>
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={this.state.email} placeholder="Enter your email address..." id="email" onChange={this.handleChange} required/>
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={this.state.password} placeholder="Enter your very secure password..." id="password" onChange={this.handleChange} required/>
            </div>
            <div>
              <label>Experience</label>
              <input type="text" value={this.state.experience} placeholder="Enter your experience" id="experience" onChange={this.handleChange} required/>
            </div>
            <div>
              <label>Date Started </label>
              <input type="date" value={this.state.datestarted} id="datestarted" onChange={this.handleChange} required/>
            </div>
            <div className="select">
              <label>Course </label>
               <select id="course_id" onChange={this.handleChange}>
                  <option>Select course</option>
                  { course }
               </select>
            </div>
            <br />
            <br />
            <br />
            <div>
              <input type="submit" className="btn-submit" />
            </div>
            <p>
               Have an account? <Link to="/employee/login">Login here!</Link>
             </p>
          </form>
        </div>
          );
      }
	}

export default EmployeeRegister;
