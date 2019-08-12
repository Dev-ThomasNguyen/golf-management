import React, { Component } from "react";

class UpdateCourse extends Component {
  state = {
    clubName : "",
    admin : "",
    employees : "",
    city : "",
    state : ""
  };

  async componentDidMount() {
    const  course = await this.loadData();
    console.log(course);
    this.setState({
        clubName : course.clubname,
        admin : course.admin,
        employees: course.admin,
        city : course.city,
        state : course.state
    });
  }

    loadData = async () => {
        const courseId = this.props.match.params.course_id;
        const url = `http://localhost:3000/yourcourse/courses/${courseId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    handleClubNameChange = e => {
        this.setState({
            clubName: e.target.value
        });
    };

    handleAdminChange = e => {
        this.setState({
            admin: e.target.value
        });
    };

    handleEmployeesChange = e => {
        this.setState({
            employees: e.target.value
        });
    };

    handleCityChange = e => {
        this.setState({
            city: e.target.value
        });
    };

    handleStateChange = e => {
        this.setState({
            state: e.target.value
        });
    };

  handleSubmit = e => {
    e.preventDefault();
    const courseId = this.props.match.params.course_id;
    const clubName = this.state.clubName;
    const admin = this.state.admin;
    const employees = this.state.employees;
    const city= this.state.city;
    const state = this.state.state;
    const data = { clubName, admin, employees, city, state };
    const url = `http://localhost:3000/yourcourse/courses/update/${courseId}`;
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
        <h2>{this.state.courseId}</h2>
        <form onSubmit={this.handleSubmit}>
            <label> Course Name: </label>
            <input
                type="text"
                onChange={this.handleClubNameChange}
                name="clubName"
                value={this.state.clubName}
            />
            <label> Admin </label>
            <input
                type="text"
                onChange={this.handleAdminChange}
                name="admin"
                value={this.state.admin}
            />
            <label> Employees: </label>
            <input 
                type="text"
                onChange={this.handleEmployeesChange}
                name="employees"
                value={this.state.employees}
            />
            <label> City: </label>
            <input
                type="text"
                onChange={this.handleCityChange}
                name="city"
                value={this.state.city}
            />
            <label> State: </label>
            <input
                type="text"
                onChange={this.handleStateChange}
                name="state"
                value={this.state.state}
            />
            <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default UpdateCourse;