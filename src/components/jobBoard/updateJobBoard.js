import React, { Component } from "react";

class UpdateJobBoard extends Component {
  state = {
    date : "",
    jobtype : "",
    employee : "",
    comments : "",
    jobboard_id : null,
    employees: []
  };

  async componentDidMount() {
    const job = await this.loadData();
    const response = await this.loadEmployee()
    this.setState({
        date : job.date,
        jobtype : job.jobtype,
        employee : job.employee,
        comments : job.comments,
        job_id : job.job_id,
        employees: response

    });
  }

    loadData = async () => {
        const jobId = this.props.match.params.job_id;
        const url = `http://localhost:3000/jobboard/jobs/${jobId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    loadEmployee = async () => {
        const url = "http://localhost:3000/employee/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };


    handleDateChange = e => {
        this.setState({
            date: e.target.value
        });
    };

    handleJobTypeChange = e => {
        this.setState({
            jobtype: e.target.value
        });
    };

    handleEmployeeChange = e => {
        this.setState({
            employee: e.target.value
        });
    };

    handleCommentsChange = e => {
        this.setState({
            comments: e.target.value
        });
    };


  handleSubmit = e => {
    e.preventDefault();
    const jobId = this.props.match.params.job_id;
    const date = this.state.date;
    const jobtype = this.state.jobtype;
    const employee = this.state.employee;
    const comments = this.state.comments;
    const data = { date, jobtype, employee, comments };
    const url = `http://localhost:3000/jobboard/jobs/update/${jobId}`;
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
          this.props.history.push(`/jobs/${jobId}`);
        }
      })
      .catch(err => {
        console.log(err);
    });
  };
  
  render() {
    const employee = this.state.employees.map((co) => {
        return (
          <option value={co.id} key={co.id}>{co.firstname} {co.lastname}</option>
        )
      })

    return (
      <div className="logincontainer">
        <h2>{this.state.jobboardId}</h2>
        <form onSubmit={this.handleSubmit}>
            <label> Date: </label>
            <input
                type="date"
                onChange={this.handleDateChange}
                name="date"
                value={this.state.date}
            />
            <label> Job: </label>
            <input
                type="text"
                onChange={this.handleJobTypeChange}
                name="jobtype"
                value={this.state.jobtype}
             />
            <div className="select is-medium">
               <label>Employee: </label>
               <select id="employee" onChange={this.handleChange} value={this.state.employee}>
                  <option>Select Employee</option>
                  { employee }
               </select>
            </div><br />
            <label> Comments: </label>
            <input
                type="text"
                onChange={this.handleCommentsChange}
                name="comments"
                value={this.state.comments}
            />
          <input type="submit" value="Submit" className="btn-submit" />
        </form>
      </div>
    );
  }
}

export default UpdateJobBoard;
