import React, { Component } from "react";

class UpdateEmployee extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    experience: "", 
    dateStarted: "",
    course_id: "",
    employee_id: null
  };

  async componentDidMount() {
    const employee = await this.loadData();
    console.log(employee);
    this.setState({
        firstName: employee.firstname,
        lastName: employee.lastname,
        phone: employee.phone,
        email: employee.email,
        password: employee.password,
        experience: employee.experience, 
        dateStarted: employee.datestarted,
        course_id: employee.course_id,
        employee_id: employee.employee_id
    });
  }

    loadData = async () => {
        const employeeId = this.props.match.params.employee_id;
        const url = `http://localhost:3000/employee/employees/${employeeId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    handleFirstNameChange = e => {
        this.setState({
            firstName: e.target.value
        });
    };

    handleLastNameChange = e => {
        this.setState({
            lastName: e.target.value
        });
    };

    handlePhoneChange = e => {
        this.setState({
            phone: e.target.value
        });
    };

    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        });
    };

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    handleExperienceChange = e => {
        this.setState({
            experience: e.target.value
        });
    };

    handleDateStartedChange = e => {
        this.setState({
            dateStarted: e.target.value
        });
    };

    handleCourse_idChange = e => {
        this.setState({
            course_id: e.target.value
        });
    };

  handleSubmit = e => {
    e.preventDefault();
    const employeeId = this.props.match.params.employee_id;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const phone = this.state.phone;
    const email = this.state.email;
    const password = this.state.password;
    const experience = this.state.experience;
    const dateStarted = this.state.dateStarted;
    const course_id = this.state.course_id;
    const data = { firstName, lastName, phone, email, password, experience, dateStarted ,course_id };
    const url = `http://localhost:3000/employee/employees/update/${employeeId}`;
    const response = fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        
      },
      
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
    });
  };
  
  render() {
    return (
      <>
        <h2>{this.state.employeeId}</h2>
        <form onSubmit={this.handleSubmit}>
            <label> First Name: </label>
            <input
                type="text"
                onChange={this.handleFirstNameChange}
                name="firstName"
                value={this.state.firstName}
            />
            <label> Last Name: </label>
            <input
                type="text"
                onChange={this.handleLastNameChange}
                name="lastName"
                value={this.state.lastName}
            />
            <label> Phone Number: </label>
            <input 
                type="text"
                onChange={this.handlePhoneChange}
                name="phone"
                value={this.state.phone}
            />
            <label> Email: </label>
            <input
                type="text"
                onChange={this.handleEmailChange}
                name="email"
                value={this.state.email}
            />
            <label> Experience: </label>
            <input
                type="text"
                onChange={this.handleExperienceChange}
                name="experience"
                value={this.state.experience}
            />
            <label> Date Started: </label>
            <input
                type="text"
                onChange={this.handleDateStartedChange}
                name="dateStarted"
                value={this.state.dateStarted}
            />
            <label> Course ID: </label>
            <input
                type="text"
                onChange={this.handleCourse_idChange}
                name="course_id"
                value={this.state.course_id}
            />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default UpdateEmployee;